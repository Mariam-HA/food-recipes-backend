const { model, Schema } = require("mongoose");

const recipeSchema = new Schema(
  {
    name: { type: String, required: true },

    recipeImage: { type: String, required: true },

    steps: [{ type: String, unique: false, required: true }],

    description: { type: String, unique: false, required: true },

    //clickCounter: { type: Number, default: 0 },

    prepareTime: { type: String, required: true },

    //relations
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },

    ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],

    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  }
  // { timestamps: true }
);

module.exports = model("Recipe", recipeSchema);
