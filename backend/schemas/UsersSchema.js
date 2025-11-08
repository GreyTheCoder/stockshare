const { Schema } = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    
  },
);
UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = { UserSchema };