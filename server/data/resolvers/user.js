import { Users } from '../db/user'

import base64ToImage from 'base64-to-image';
import isBase64 from "is-base64";
const envJSON = require('./../../.env.info.json');
var node_env = process.env.NODE_ENV || 'development';
const RUTEIMAGES = envJSON[node_env].RUTEIMAGES;
export const resolvers = {
    Query: {
        getUsers: () => {
            return  new Promise((resolve, rejects) => {
             Users.find({}, (error, users) => {
                resolve(users)
            });
        })
        }
    }

}