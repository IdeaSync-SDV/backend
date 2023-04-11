import TodoModel from "../src/db/models/TodoModel.js"

const fetchPost = async (req, _res, next) => {
  const post = await TodoModel.findById(req.params.id)
  if (req.ctx.util.handleNotFound(post)) {
    return
  }

  req.ctx.post = post

  next()
}

export default fetchPost
