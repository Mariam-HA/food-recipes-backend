const { model, Schema } = require("mongoose");

const ingredientSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },

    // relations
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    recipies: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  },
  { timestamps: true }
);

module.exports = model("Ingredient", ingredientSchema);
