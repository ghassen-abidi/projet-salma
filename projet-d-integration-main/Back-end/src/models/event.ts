import mongoose from "mongoose";
const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  approuve: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    required: true,
  },
});
export default mongoose.model("Event", Schema);
