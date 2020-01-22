import { User } from '../db/user'

import base64ToImage from 'base64-to-image';
import isBase64 from "is-base64";
const envJSON = require('./../../.env.info.json');
var node_env = process.env.NODE_ENV || 'development';
const RUTEIMAGES = envJSON[node_env].RUTEIMAGES;
export const resolvers = {
    Query: {
        getUsers: (root, { id }) => {
            return new Promise((resolve, rejects) => {
                User.find({_id:{ $ne: id }}, (error, users) => {
                    console.log(users)
                    resolve(users)
                });
            })
        }
    },
    Mutation:{
        Login:(root, { input })=>{
            return new Promise((resolve, rejects) => {
                User.findOne({ nickname: input.nickname.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""), password: input.password }, (error, user) => {
                    if(user)resolve(user)
                    else rejects(null)
                })
            })
        },
        SignUp:(root, { input })=>{
            return new Promise((resolve, rejects) => {
                let data={//create object to save data user
                    names:input.names,
                    nickname:input.nickname.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                    password:input.password
                }
                if(isBase64(input.photo, {mime: true})){//check if image is base64 or is null whatever
                    let image= (input.photo.toString()).replace(/(\r\n|\n|\r)/gm,"") 
                    let name_image=new Date().getTime();
                    data.photo=`http://35.224.179.43/public/${name_image}.png`;
                    var optionalObj = { 'fileName': name_image, 'type': 'png' };
                    try {
                        base64ToImage(image, RUTEIMAGES, optionalObj);
                    } catch (error) {
                        console.log(error)
                    }
                }
                const user = User(data)
                user.id = user._id;
                user.save((error) => {
                    if(error) rejects(null)
                    else resolve(user)
                })
            })
        },
        UpdateUser:(root, { input })=>{
            return new Promise((resolve, rejects) => {
                let data={//create object to save data user
                    names:input.names,
                    nickname:input.nickname,
                    password:input.password
                }
                if(isBase64(input.photo, {mime: true})){//check if image is base64 or is null whatever
                    let image= (input.photo.toString()).replace(/(\r\n|\n|\r)/gm,"") 
                    let name_image=new Date().getTime();
                    data.photo=`http://35.224.179.43/public/${name_image}.png`;
                    var optionalObj = { 'fileName': name_image, 'type': 'png' };
                    try {
                        base64ToImage(image, RUTEIMAGES, optionalObj);
                    } catch (error) {
                        console.log(error)
                    }
                }
                User.findOneAndUpdate({ _id: input.id }, data, { new: true }, (error, user) => {
                    console.log(user)
                    user.id=user._id
                    resolve(user)
                })
            })
        }
    }

}