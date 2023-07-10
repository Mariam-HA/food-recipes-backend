const { model, Schema } = require("mongoose");

const recipeSchema = new Schema(
  {
    name: { type: String, requires: true },

    recipeImage: { type: String },

    steps: [{ type: String, requires: true }],

    description: { type: String, requires: true },

    clickCounter: { type: Number, default: 0 },

    prepareTime: { type: String, requires: true },

    //relations

    createdBy: { type: Schema.Types.ObjectId, ref: "User" },

    ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],

    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],

    // reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

module.exports = model("Recipe", recipeSchema);

//requires: true
