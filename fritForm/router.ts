import type {Request, Response} from 'express';
import express from 'express';
import FreetCollection from '../freet/collection';
import UserCollection from './collection';
import * as userValidator from '../user/middleware';
import * as util from './util';

const router = express.Router();

export {router as fritformRouter};
