import fetchTodo from "../middleware/fetchTodo.js"
import TodoModel from "../db/models/TodoModel.js"

const prepareTodoRoutes = (app) => {
  app.get("/todos", async (_, res) => {
    const todos = await TodoModel.find()

    res.send({ result: todos })
  })

  app.get("/todos/oldest", async (_, res) => {
    const todos = await TodoModel.find({ isDone: false })
    const oldestUnoneTodo = todos.sort((a, b) => a.date - b.date)[0]

    res.send({ result: oldestUnoneTodo || null })
  })

  app.patch("/todos/:id", fetchTodo, async (req, res) => {
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
