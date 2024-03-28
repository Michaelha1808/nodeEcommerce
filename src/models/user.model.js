"use strict";
const { model, Schema } = require("mongoose"); // Erase if already required
const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";

const userSchema = new Schema(
  {
    usr_id: { type: Number, required: true },
    usr_slug: { type: String, required: true },
    usr_name: { type: String, default: "" },
    usr_password: { type: String, default: "" },
    usr_salf: { type: String, default: "" },
    usr_email: { type: Number, required: true },
    usr_phone: { type: String, default: "" },
    usr_sex: { type: String, default: "" },
    usr_avatar: { type: Number, default: "" },
    usr_date_of_birth: { type: Date, required: null },
    usr_role: { type: Schema.Types.ObjectId, ref: "Role" },
    usr_status: {
      type: string,
      default: "pending",
      enum: ["pending", "active", "block"],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);
module.exports = model(DOCUMENT_NAME, userSchema);
