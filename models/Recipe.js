const { model, Schema } = require("mongoose");

const recipeSchema = new Schema(
  {
    name: { type: String, unique: true, requires: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    recipeImage: { type: String, unique: true, requires: true },
    ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
    steps: [{ type: String, unique: true, requires: true }],
    decription: String,
    clickCounter: { type: Number, default: 0 },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    prepareTime: { type: String, requires: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

module.exports = model("Recipe", recipeSchema);
