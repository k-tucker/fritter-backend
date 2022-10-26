import {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

/**
 * This file defines the properties stored in a Like
 * DO NOT implement operations here ---> use collection file
 */

// export type postTypes = 'Freet' | 'Quote';

// Type definition for Like on the backend
export type Like = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  liker: Types.ObjectId;
  liked: Types.ObjectId;
  postType: string;
};

// Mongoose schema definition for interfacing with a MongoDB table
// Users stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const LikeSchema = new Schema({
  // The user doing the like
  liker: {
    type: Types.ObjectId,
    required: true
  },
  // The ID of the item being liked
  liked: {
    type: Set,
    required: true
  },
  // The type of post being liked
  postType: {
    type: String,
    required: true
  }
});

const LikeModel = model<Like>('Like', LikeSchema);
export default LikeModel;
