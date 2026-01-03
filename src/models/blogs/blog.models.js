import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: [{ type: String }], // Array of S3 URLs
    coverImage: { type: String }, // S3 URL
    tags: [{ type: String }], // ["mountains", "himalayas"]
    destination: { type: mongoose.Schema.Types.ObjectId, ref: "Destination" },
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
