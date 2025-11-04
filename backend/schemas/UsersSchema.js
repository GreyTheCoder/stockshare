const { Schema } = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

/**
 * Simple User schema that works with passport-local-mongoose.
 * passport-local-mongoose will add fields like:
 * - username (we tell it to use 'email' as the usernameField)
 * - hash
 * - salt
 *
 * So you only need to store any extra fields (here: email).
 */
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    // add other fields if needed (e.g., name) — keep minimal as requested
  },
);

// Use email as the usernameField so passport-local-mongoose will:
// - treat email as the username for login
// - add username / hash / salt fields automatically (username will be the email)
UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = { UserSchema };