import TodoModel from "../db/models/TodoModel.js"

const prepareTodoRoutes = (app) => {
  // READ all todos
  app.get("/todo", async (req, res) => {
    const posts = await TodoModel.find()

    res.send({ result: posts })
  })

  //get latest todo
  app.get("/todo/latest", async (req, res) => {
    const latestPost = await TodoModel.find({ isDone: false })
      .sort({ date: -1 })
      .limit(1)

    res.send({ result: latestPost })
  })

  //POST REQUEST
  //EXEMPLE WITH POSTMAN

  /**
   * @typedef {(Dare|int)}
   * @typedef {(title|String)}
   * @typedef {(content|String)}
   */
  app.post("/todo", async (req, res) => {
    const { title, content, date } = req.body

    try {
      const post = await new TodoModel({
        title,
        content,
        date: date || new Date().toISOString(),
        isDone: false,
      }).save()

      res.send({ result: post })
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .send({ error: "Une erreur est survenue lors de la création du post" })
    }
  })
}

export default prepareTodoRoutes
