const { model } = require("mongoose");
const { UserSchema } = require("../schemas/UsersSchema");


const UserModel = model("User", UserSchema);

module.exports = { UserModel };