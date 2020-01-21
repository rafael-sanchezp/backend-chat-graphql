import { Message } from '../db/message'

import base64ToImage from 'base64-to-image';
import isBase64 from "is-base64";
const envJSON = require('./../../.env.info.json');
var node_env = process.env.NODE_ENV || 'development';
const RUTEIMAGES = envJSON[node_env].RUTEIMAGES;
export const resolvers = {
    Query: {
        getMessage:(root, { input })=>{
            return new Promise((resolve, rejects) => {
                Message.find({
                    $and: [
                        { $or: [{user: input.user}, {user: input.owner}] },
                        { $or: [{owner: input.user}, {owner: input.owner}]}
                    ]
                }).exec((error, messages) => {
                    resolve(messages)
                });
            })
        }
    },
    Mutation:{
        createMessage:(root, { input })=>{
            return new Promise((resolve, rejects) => {
                let data={
                    text:input.text,
                    user:input.user,
                    owner:input.owner,
                    type:input.type
                }
                console.log(data)
                const message = Message(data)
                message.id = message._id;
                message.save((error) => {
                    if(error) rejects(null)
                    else resolve({status:"SUCCESS"})
                })
            })
        }, 
    }

}