const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    email: { type: String, unique: true, requires: true },
    username: { type: String, unique: true },
    password: { type: String, required: true },
    fname: String,
    lstnme: String,
    recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],

    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    userImage: String,
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
