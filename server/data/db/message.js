import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
const envJSON = require('./../../.env.info.json');
var node_env = process.env.NODE_ENV || 'development';
const db =envJSON[node_env].DB;
const ip =envJSON[node_env].DBADRESS;
mongoose.connect(`mongodb://${ip}/${db}`, { useNewUrlParser: true });
const MessageSchema = new mongoose.Schema({
    text:String,
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    owner:{ type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    type:String// it migth be text,video or maybe image
})
const Message=mongoose.model('messages',MessageSchema);
export {Message}