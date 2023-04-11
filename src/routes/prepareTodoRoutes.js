import fetchPost from "../../middleware/fetchPost.js"
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
    const { post } = req.ctx
    console.log(isDone)
    Object.assign(post, {
      title: post.title,
      content: post.content,
      isDone: isDone ?? post.isDone,
    })

    await post.save()

    res.send({ result: post })
  })

  app.post("/todos", async (req, res) => {
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
