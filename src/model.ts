import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    password: string;
  }

const UserSchema: Schema = new Schema({
    username: String,
    password: String
  });

export default mongoose.model<IUser>('User', UserSchema, "users");