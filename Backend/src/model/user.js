import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trime: true,
    },

    email: {
      type: String,
      require: true,
      unique: true,
      trime: true,
    },

    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);
export default User;
