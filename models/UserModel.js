const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },

    username: { type: String, required: true, unique: true, trim: true },

    password: { type: String, required: true, select: false },

    phoneNumber: { type: Number, required: true },

    address: { type: String, required: true },

    profilePicUrl: { type: String },

    newMessagePopup: { type: Boolean, default: true },

    unreadMessage: { type: Boolean, default: false },

    unreadNotification: { type: Boolean, default: false },

    role: { type: String, default: "user", enum: ["user", "admin"] },

    resetToken: { type: String },

    expireToken: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
