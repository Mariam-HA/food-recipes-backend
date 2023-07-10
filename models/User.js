const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    email: { type: String, unique: true, requires: true },
    username: { type: String, unique: true },
    password: { type: String, required: true },
    userImage: {
      type: String,
      default:
        "/Users/amalalrasdan/Development/food-recipes-backend/media/360_F_459430736_z1f2IZmk4WAAJhzBRCLxu9H2LUyFeRFV.jpeg",
    },

    // relations
    recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
