import TodoModel from "../db/models/TodoModel.js"

const prepareTodoRoutes = (app) => {
  app.get("/todos", async (_, res) => {
    const todos = await TodoModel.find()

    res.send({ result: todos })
  })

  app.get("/todos/oldest", async (_, res) => {
    const todos = await TodoModel.find({ isDone: false })
    const oldestUnoneTodo = todos.sort((a, b) => a.date - b.date)[0]

    // We return a null string instead of null to avoid the client to have to parse the response
    res.send({ result: oldestUnoneTodo || "null" })
  })

  app.patch("/todos/oldest", async (req, res) => {
    const todos = await TodoModel.find({ isDone: false })
    const oldestUnoneTodo = todos.sort((a, b) => a.date - b.date)[0]

    if (!oldestUnoneTodo) {
      res.send({ result: null })

      return
    }

    Object.assign(oldestUnoneTodo, {
      isDone: true,
    })

    await oldestUnoneTodo.save()

    res.send({ result: oldestUnoneTodo })
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
