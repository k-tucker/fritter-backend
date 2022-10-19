import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

/**
 * This file defines the properties stored in a Quote Freet
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Quote Freet on the backend
export type QuoteFreet = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  freetId: Types.ObjectId;
  authorId: Types.ObjectId;
  dateCreated: Date;
  content: string;
  dateModified: Date;
  views: number; // Add a new field called "views" with the number type to the interface
  anon: boolean;
};

// Mongoose schema definition for interfacing with a MongoDB table
// Quote Freets stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const QuoteFreetSchema = new Schema<QuoteFreet>({
  // The author userId
  authorId: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // The freet this quote freet was created
  freetId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  // The date the quote freet was created
  dateCreated: {
    type: Date,
    required: true
  },
  // The content of the quote freet
  content: {
    type: String,
    required: true
  },
  // The date the quote freet was modified
  dateModified: {
    type: Date,
    required: true
  },
  // Add views field to the schema
  views: {
    type: Number,
    default: 0
  },
  // Whether or not original freet is anonymized
  anon: {
    type: Boolean,
    required: true
  }
});

const FreetModel = model<QuoteFreet>('Freet', QuoteFreetSchema);
export default FreetModel;
