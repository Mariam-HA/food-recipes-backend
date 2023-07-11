const { model, Schema } = require("mongoose");

const categorySchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    catImage: {
      type: String,
      required: false,
      default: "media/360_F_459430736_z1f2IZmk4WAAJhzBRCLxu9H2LUyFeRFV.jpeg",
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  },
  { timestamps: true }
);

module.exports = model("Category", categorySchema);
