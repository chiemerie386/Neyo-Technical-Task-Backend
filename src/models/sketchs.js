const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const SketchSchema = new Schema(
  {
    title: {
      type: String,
    },
    collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    body: {
        type: String
    },
  },
  { timestamps: true }
);

SketchSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.__v;
    delete ret.createdAt;
    delete ret.updatedAt;

    return ret;
  },
});

const Sketch = mongoose.model('Sketch', SketchSchema);

module.exports =  Sketch;
