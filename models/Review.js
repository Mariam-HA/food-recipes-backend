const { model, Schema } = require("mongoose");

const reviewSchema = new Schema(
  {
    reviewText: { type: String },
    rating: Number,

    //relations
    recipe: { type: Schema.Types.ObjectId, ref: "Recipe" },

    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = model("Review", reviewSchema);
