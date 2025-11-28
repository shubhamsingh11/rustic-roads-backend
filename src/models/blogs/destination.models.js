import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    country: { type: String },
    description: { type: String },
    coverImage: { type: String }, // S3 URL
  },
  { timestamps: true }
);

export default mongoose.model("Destination", destinationSchema);
