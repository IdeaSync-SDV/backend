import TodoSchema from "../schemas/TodoSchema.js"
import { model } from "mongoose"

const TodoModel = model("Todo", TodoSchema)

export default TodoModel
