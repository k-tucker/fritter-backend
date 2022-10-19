import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import QuoteFreetCollection from './collection';
import * as userValidator from '../user/middleware';
import * as quoteFreetValidator from '../quoteFreet/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Get all the quote freets
 *
 * @name GET /api/quotes
 *
 * @return {QuoteFreetResponse[]} - A list of all the quote freets sorted in descending
 *                      order by date modified
 */
/**
 * Get quote freets by author.
 *
 * @name GET /api/quotes?authorId=id
 *
 * @return {QuoteFreetResponse[]} - An array of quote freets created by user with id, authorId
 * @throws {400} - If authorId is not given
 * @throws {404} - If no user has given authorId
 *
 */
router.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    // Check if authorId query parameter was supplied
    if (req.query.author !== undefined) {
      next();
      return;
    }

    const allQuoteFreets = await QuoteFreetCollection.findAll();
    const response = allQuoteFreets.map(util.constructQuoteFreetResponse);
    res.status(200).json(response);
  },
  [
    userValidator.isAuthorExists
  ],
  async (req: Request, res: Response) => {
    const authorQuoteFreets = await QuoteFreetCollection.findAllByUsername(req.query.author as string);
    const response = authorQuoteFreets.map(util.constructQuoteFreetResponse);
    res.status(200).json(response);
  }
);

/**
 * Create a new quote freet.
 *
 * @name POST /api/quotes
 *
 * @param {string} content - The content of the quote freet
 * @param {string} freetId - ID of the original freet
 * @param {string} anon - whether or not to anonymize
 * @return {QuoteFreetResponse} - The created quote freet
 * @throws {403} - If the user is not logged in
 * @throws {400} - If the freet content is empty or a stream of empty spaces
 * @throws {413} - If the freet content is more than 140 characters long
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    quoteFreetValidator.isValidQuoteFreetContent
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const quoteFreet = await QuoteFreetCollection.addOne(userId, req.body.freetId, req.body.content, req.body.anon);

    res.status(201).json({
      message: 'Your freet was created successfully.',
      freet: util.constructQuoteFreetResponse(quoteFreet)
    });
  }
);

/**
 * Delete a freet
 *
 * @name DELETE /api/freets/:id
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the author of
 *                 the freet
 * @throws {404} - If the freetId is not valid
 */
router.delete(
  '/:freetId?',
  [
    userValidator.isUserLoggedIn,
    quoteFreetValidator.isQuoteFreetExists,
    quoteFreetValidator.isValidQuoteFreetModifier
  ],
  async (req: Request, res: Response) => {
    await QuoteFreetCollection.deleteOne(req.params.freetId);
    res.status(200).json({
      message: 'Your freet was deleted successfully.'
    });
  }
);

/**
 * Modify a freet
 *
 * @name PUT /api/freets/:id
 *
 * @param {string} content - the new content for the freet
 * @return {FreetResponse} - the updated freet
 * @throws {403} - if the user is not logged in or not the author of
 *                 of the freet
 * @throws {404} - If the freetId is not valid
 * @throws {400} - If the freet content is empty or a stream of empty spaces
 * @throws {413} - If the freet content is more than 140 characters long
 */
router.put(
  '/:freetId?',
  [
    userValidator.isUserLoggedIn,
    quoteFreetValidator.isQuoteFreetExists,
    quoteFreetValidator.isValidQuoteFreetModifier,
    quoteFreetValidator.isValidQuoteFreetContent
  ],
  async (req: Request, res: Response) => {
    const freet = await QuoteFreetCollection.updateOne(req.params.freetId, req.body);
    res.status(200).json({
      message: 'Your freet was updated successfully.',
      freet: util.constructQuoteFreetResponse(freet)
    });
  }
);

export {router as freetRouter};
