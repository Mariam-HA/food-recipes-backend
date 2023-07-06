const { model, Schema } = require("mongoose");

const reviewSchema = new Schema(
  {
    recipe: { type: Schema.Types.ObjectId, ref: "Recipe" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    reviewText: { type: String },
    rating: Number,
  },
  { timestamps: true }
);

module.exports = model("Review", reviewSchema);
