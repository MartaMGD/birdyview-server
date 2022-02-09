const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let birdSchema = new Schema({
  name: {
    type: String,
    unique:true,
  },
  scientificname: {
    type: String,
  },
  height: {
    type: String,
  },
  wingspan: {
    type: String,
  },
  location: {
    type: Array,
  },
  description: {
    type: String,
    unique:true,
  },
});

birdSchema.plugin(uniqueValidator, { message: "{PATH} should be unique" });

module.exports = mongoose.model("Bird", birdSchema);