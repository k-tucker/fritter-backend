import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import QuoteFreetCollection from '../quoteFreet/collection';

/**
 * Checks if a quote freet with quoteFreetId is req.params exists
 */
const isQuoteFreetExists = async (req: Request, res: Response, next: NextFunction) => {
  const validFormat = Types.ObjectId.isValid(req.params.freetId);
  const quoteFreet = validFormat ? await QuoteFreetCollection.findOne(req.params.freetId) : '';
  if (!quoteFreet) {
    res.status(404).json({
      error: {
        freetNotFound: `Quote freet with ID ${req.params.quoteFreetId} does not exist.`
      }
    });
    return;
  }

  next();
};

/**
 * Checks if the content of the quote freet in req.body is valid, i.e not a stream of empty
 * spaces and not more than 140 characters
 */
const isValidQuoteFreetContent = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.content) {
    next();
    return;
  }

  const {content} = req.body as {content: string};
  if (!content.trim()) {
    res.status(400).json({
      error: 'Quote freet content must be at least one character long.'
    });
    return;
  }

  if (content.length > 140) {
    res.status(413).json({
      error: 'Quote freet content must be no more than 140 characters.'
    });
    return;
  }

  next();
};

/**
 * Checks if the current user is the author of the quote freet whose quoteFreetId is in req.params
 */
const isValidQuoteFreetModifier = async (req: Request, res: Response, next: NextFunction) => {
  const quoteFreet = await QuoteFreetCollection.findOne(req.params.quoteFreetId);
  const userId = quoteFreet.authorId;
  if (req.session.userId !== userId.toString()) {
    res.status(403).json({
      error: 'Cannot modify other users\' quote freets.'
    });
    return;
  }

  next();
};

export {
  isValidQuoteFreetContent,
  isQuoteFreetExists,
  isValidQuoteFreetModifier
};
