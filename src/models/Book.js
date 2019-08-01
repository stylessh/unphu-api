import { Schema, model } from "mongoose";

// creating the database Book schema
const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    imageName: { type: String },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 }
  },
  {
      timestamps: true
  }
);

export default model("Book", bookSchema);
