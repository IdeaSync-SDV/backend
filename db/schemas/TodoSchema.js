import { Schema } from "mongoose"

const TodoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    isDone: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

export default TodoSchema
