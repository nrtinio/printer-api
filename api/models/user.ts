// const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');
import {model, Schema, Model, Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const schemaOptions = {
    toObject: {
      virtuals: true
    }
    ,toJSON: {
      virtuals: true
    }
  };

interface IUser extends Document {
  email: string;
  password: string;
  role: string;
  active: boolean;
  first_name: string;
  last_name: string;
  alias: string;
}

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String },
    active: {type: Boolean },
    first_name: { type: String },
    last_name: { type: String },
    alias: { type: String }
}, schemaOptions);

userSchema.plugin(uniqueValidator);

userSchema.virtual('firstName')
.get(function() {
    return this.first_name;
})
.set(function(firstName: string) {
    this.set('first_name', firstName)
});

userSchema.virtual('lastName')
.get(function() {
    return this.last_name;
})
.set(function(lastName: string) {
    this.set('last_name', lastName);
});

// const User:Model<IUser> = model('User', userSchema);

export default model<IUser>('User', userSchema, 'users');
