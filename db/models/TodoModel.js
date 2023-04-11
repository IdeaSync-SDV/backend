import { model } from "mongoose"
import TodoSchema from "../schemas/TodoSchema.js"

const TodoModel = model("Todo", TodoSchema)

export default TodoModel
