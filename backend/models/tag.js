const mongoose = require('mongoose');
const { Schema } = mongoose;

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  usageCount: {
    type: Number,
    default: 0
  }
});

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;
