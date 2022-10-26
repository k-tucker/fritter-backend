import type {HydratedDocument, Types} from 'mongoose';
import type {Like} from './model';
import LikeModel from '../like/model';
import UserCollection from '../user/collection';
import FreetCollection from '../freet/collection';
import QuoteCollection from '../quote/collection';

/**
 * This file contains a class with functionality to interact with Likes stored
 * in MongoDB, including adding, finding, updating, and deleting. Feel free to add
 * additional operations in this file.
 */
class LikeCollection {
  /**
   * Add a new Like
   *
   * @param {string} userId - The userId of the account making this like
   * @param {string} postId - The ID of the post being liked
   * @param {string} postType - Whether post is a freet or a quote freet
   * @return {Promise<HydratedDocument<Like>>} - The newly created Like
   */
  static async addOne(userId: string, postId: string, postType: string): Promise<HydratedDocument<Like>> {
    const user = await UserCollection.findOneByUserId(userId);
    let post;
    if (postType === 'Freet') {
      post = await FreetCollection.findOne(postId);
    } else {
      post = await QuoteCollection.findOne(postId);
    }

    const like = new LikeModel(user._id, post._id, postType);
    await like.save(); // Saves user to MongoDB
    return like;
  }

  /**
   * Find a Like by likeId.
   *
   * @param {string} likeId - The likeId of the Like to find
   * @return {Promise<HydratedDocument<Like>> | Promise<null>}
   */
  static async findOneByLikeId(likeId: Types.ObjectId | string): Promise<HydratedDocument<Like>> {
    return LikeModel.findOne({_id: likeId});
  }

  /**
   * Delete a Like from the collection.
   *
   * @param {string} likeId - The likeId of Like to delete
   * @return {Promise<Boolean>} - true if the Like has been deleted, false otherwise
   */
  static async deleteOne(likeId: Types.ObjectId | string): Promise<boolean> {
    const like = await LikeModel.deleteOne({_id: likeId});
    return like !== null;
  }
}

export default LikeCollection;
