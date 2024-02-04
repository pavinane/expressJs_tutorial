import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // must mentoin which data type are using, and required and unique for needing neceessary
  userName: {
    type: mongoose.Schema.Types.String,
    required: true,
    //  unique: true, // username can be unique because it cannot accept already declared name like email
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true, // username can be unique because it cannot accept already declared name like email
  },
  displayName: mongoose.Schema.Types.String,
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
