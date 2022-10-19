import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {QuoteFreet} from '../quoteFreet/model';

// Update this if you add a property to the Freet type!
type QuoteFreetResponse = {
  _id: string;
  freetId: string;
  authorId: string;
  dateCreated: string;
  content: string;
  dateModified: string;
  views: number;
  anon: boolean;
};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
const formatDate = (date: Date): string => moment(date).format('MMMM Do YYYY, h:mm:ss a');

/**
 * Transform a raw Freet object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<QuoteFreet>} freet - A freet
 * @returns {QuoteFreetResponse} - The freet object formatted for the frontend
 */
const constructQuoteFreetResponse = (quoteFreet: HydratedDocument<QuoteFreet>): QuoteFreetResponse => {
  const quoteFreetCopy: QuoteFreet = {
    ...quoteFreet.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };

  return {
    ...quoteFreetCopy,
    _id: quoteFreetCopy._id.toString(),
    freetId: quoteFreetCopy.freetId.toString(),
    authorId: quoteFreetCopy.authorId.toString(),
    dateCreated: formatDate(quoteFreet.dateCreated),
    dateModified: formatDate(quoteFreet.dateModified)
  };
};

export {
  constructQuoteFreetResponse
};
