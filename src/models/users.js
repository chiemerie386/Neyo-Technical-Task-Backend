const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },    
    colour: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    }
  },
  { timestamps: true }
);

UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.__v;
    delete ret.createdAt;
    delete ret.updatedAt;

    return ret;
  },
});

const User = mongoose.model('User', UserSchema);

module.exports =  User;
