import fetchPost from "../middleware/fetchTodo.js"
import TodoModel from "../db/models/TodoModel.js"

const prepareTodoRoutes = (app) => {
  app.get("/todos", async (_, res) => {
    const posts = await TodoModel.find()

    res.send({ result: posts })
  })

  app.get("/todos/latest", async (_, res) => {
    const latestPost = await TodoModel.findOne({ isDone: false }, null, {
      sort: {
        date: -1,
      },
    })

    res.send({ result: latestPost })
  })

  app.patch("/todos/:id", fetchPost, async (req, res) => {
    const { isDone } = req.body
    const { todo } = req.ctx

    Object.assign(todo, {
      isDone: isDone ?? todo.isDone,
    })

    await todo.save()

    res.send({ result: todo })
  })

  app.post("/todos", async (req, res) => {
    const { title, content, date } = req.body

    try {
      const todo = await new TodoModel({
        title,
        content,
        date: date || new Date().toISOString(),
        isDone: false,
      }).save()

      res.send({ result: todo })
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .send({ error: "Une erreur est survenue lors de la création du to-do" })
    }
  })
}

export default prepareTodoRoutes
