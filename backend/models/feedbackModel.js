const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Relates field to the user's object id
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: ['Feature', 'UI', 'UX', 'Enhancement', 'Bug'],
      default: 'Feature',
    },
    status: {
      type: String,
      required: [true, 'Please select a status'],
      enum: ['Suggestion', 'Planned', 'In-Progress', 'Live'],
      default: 'Suggestion',
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Feedback', feedbackSchema);
