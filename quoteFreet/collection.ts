import type {HydratedDocument, Types} from 'mongoose';
import type {QuoteFreet} from './model';
import QuoteFreetModel from './model';
import UserCollection from '../user/collection';

/**
 * This files contains a class that has the functionality to explore quote freets
 * stored in MongoDB, including adding, finding, updating, and deleting quote freets.
 */
class QuoteFreetCollection {
  /**
   * Add a quote freet to the collection
   *
   * @param {string} authorId - The id of the author of the quote freet
   * @param {string} freetId - The id of the freet being quoted
   * @param {string} content - The content of the quote freet
   * @param {boolean} anon - whether or not the original freet is anonymized
   * @return {Promise<HydratedDocument<Freet>>} - The newly created quote freet
   */
  static async addOne(authorId: Types.ObjectId | string, freetId: Types.ObjectId | string, content: string, anon: boolean): Promise<HydratedDocument<QuoteFreet>> {
    const date = new Date();
    const quoteFreet = new QuoteFreetModel({
      authorId,
      freetId,
      dateCreated: date,
      content,
      dateModified: date,
      anon
    });
    await quoteFreet.save(); // Saves quote freet to MongoDB
    return quoteFreet;
  }

  /**
   * Find a quote freet by quoteFreetId
   *
   * @param {string} quoteFreetId - The id of the quote freet to find
   * @return {Promise<HydratedDocument<QuoteFreet>> | Promise<null> } - The quote freet with the given quote freetId, if any
   */
  static async findOne(quoteFreetId: Types.ObjectId | string): Promise<HydratedDocument<QuoteFreet>> {
    return QuoteFreetModel.findOne({_id: quoteFreetId});
  }

  /**
   * Get all the quote freets in the database
   *
   * @return {Promise<HydratedDocument<QuoteFreet>[]>} - An array of all of the quote freets
   */
  static async findAll(): Promise<Array<HydratedDocument<QuoteFreet>>> {
    // Retrieves quote freets and sorts them from most to least recent
    return QuoteFreetModel.find({}).sort({dateModified: -1});
  }

  /**
   * Get all the quote freets in by given author
   *
   * @param {string} username - The username of author of the quote freets
   * @return {Promise<HydratedDocument<QuoteFreet>[]>} - An array of all of the quote freets
   */
  static async findAllByUsername(username: string): Promise<Array<HydratedDocument<QuoteFreet>>> {
    const author = await UserCollection.findOneByUsername(username);
    return QuoteFreetModel.find({authorId: author._id});
  }

  /**
   * Update a quote freet with the new content
   *
   * @param {string} quoteFreetId - The id of the quote freet to be updated
   * @param {Object} quoteFreetDetails - An object with the quote freet's updated details
   * @return {Promise<HydratedDocument<QuoteFreet>>} - The newly updated quote freet
   */
  static async updateOne(quoteFreetId: Types.ObjectId | string, quoteFreetDetails: any): Promise<HydratedDocument<QuoteFreet>> {
    const quoteFreet = await QuoteFreetModel.findOne({_id: quoteFreetId});
    if (quoteFreetDetails.views) {
      quoteFreet.views += 1;
    }

    if (quoteFreetDetails.content) {
      quoteFreet.content = quoteFreetDetails.content as string;
    }

    quoteFreet.dateModified = new Date();
    await quoteFreet.save();
    return quoteFreet;
  }

  /**
   * Delete a quote freet with given quoteFreetId.
   *
   * @param {string} quoteFreetId - The quoteFreetId of quote freet to delete
   * @return {Promise<Boolean>} - true if the quote freet has been deleted, false otherwise
   */
  static async deleteOne(quoteFreetId: Types.ObjectId | string): Promise<boolean> {
    const quoteFreet = await QuoteFreetModel.deleteOne({_id: quoteFreetId});
    return quoteFreet !== null;
  }

  /**
   * Delete all the quote freets by the given author
   *
   * @param {string} authorId - The id of author of quote freets
   */
  static async deleteMany(authorId: Types.ObjectId | string): Promise<void> {
    await QuoteFreetModel.deleteMany({authorId});
  }
}

export default QuoteFreetCollection;
