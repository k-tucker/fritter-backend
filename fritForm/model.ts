import {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

/**
 * This file defines the properties stored in a FritForm
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for FritForm on the backend
export type FritForm = {
  _id: Types.ObjectId;
  userId: Types.ObjectId; // MongoDB assigns each object this ID on creation
  fields: Set<string>;
};

// Mongoose schema definition for interfacing with a MongoDB table
// Users stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const FritFormSchema = new Schema({
  // The user associated with this FritForm
  userId: {
    type: Types.ObjectId,
    required: true
  },
  // The fields associated with this FritForm
  fields: {
    type: Set,
    required: true
  }
});

const FritFormModel = model<FritForm>('FritForm', FritFormSchema);
export default FritFormModel;
