const { model, Schema } = require("mongoose");

const categorySchema = new Schema(
  {
    name: { type: String, unique: true, requires: true },
    catImage: { type: String, requires: true },

    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    recipies: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  },
  { timestamps: true }
);

module.exports = model("Category", categorySchema);
