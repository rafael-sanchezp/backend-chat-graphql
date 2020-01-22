import { Message } from '../db/message'
import { User } from '../db/user'
import { PubSub, withFilter } from 'apollo-server'
const pubsub = new PubSub();

import base64ToImage from 'base64-to-image';
import isBase64 from "is-base64";
const envJSON = require('./../../.env.info.json');
var node_env = process.env.NODE_ENV || 'development';
const RUTEIMAGES = envJSON[node_env].RUTEIMAGES;
export const resolvers = {
    Query: {
        getMessage:(root, { input })=>{
            console.log(input)
            return new Promise((resolve, rejects) => {
                let search={}
                if(input.user==null){
                    search={user:null}
                }else{
                    search={
                        $or:[
                            { $and: [{user: input.user}, {owner: input.owner}] },
                            { $and: [{user: input.owner}, {owner: input.user}]}
                        ]
                        /* $and: [
                            { $or: [{user: input.user}, {owner: input.owner}] },
                            { $or: [{user: input.owner}, {owner: input.user}]}
                        ] */
                    }
                }
                Message.find(search).populate("user").populate("owner").exec((error, messages) => {
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
                    else {
                        Message.findById(message.id).populate("user").populate("owner").exec((error, message) => {
                            message.userId=input.user
                            pubsub.publish('LISTEN', { Listen: message });
                            resolve(message)
                        });
                    }
                })
            })
        }, 
    },Subscription: {
        Listen: {
            subscribe: withFilter(
                (payload,variables) => {
                    console.log("subscription chat:", variables)
                    return pubsub.asyncIterator('LISTEN')
                },
                (payload, variables) => {
                    return (payload.Listen.userId === variables.input.owner) || (payload.Listen.userId==null && variables.input.user==null && payload.Listen.owner.id!=variables.input.owner  );
                },
            )
        },
    }

}