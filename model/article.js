const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const article = new Schema({
    author: {
        ref: 'user',
        type: Schema.Types.ObjectId
    },
    title: String,
    contentText: String,
    looknums:{
        type:Number,
        default:0
    },
    img:{
        type:String,
        default:'../images/avatar1.jpg'
    },
    commontnums: {
        type: Number,
        default: 0
    },
    commons: [
        {
            type: Schema.Types.ObjectId,
            ref: 'common'
        }
    ],
    category: [
        {
            type: Array
        }
    ]
},{versionKey:false,timestamps:{createdAt:"createtime",updatedAt:"updatetime"}})

module.exports = mongoose.model('article', article);