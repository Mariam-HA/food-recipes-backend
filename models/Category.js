const { model, Schema } = require("mongoose");

const categorySchema = new Schema(
  {
    name: { type: String, unique: true, requires: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    catImage: { type: String, requires: true },
    recipies: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  },
  { timestamps: true }
);

module.exports = model("Category", categorySchema);
