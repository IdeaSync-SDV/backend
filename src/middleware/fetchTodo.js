import TodoModel from "../db/models/TodoModel.js"

const fetchTodo = async (req, _, next) => {
  const todo = await TodoModel.findById(req.params.id)

  if (req.ctx.util.handleNotFound(todo)) {
    return
  }

  req.ctx.todo = todo

  next()
}

export default fetchTodo
