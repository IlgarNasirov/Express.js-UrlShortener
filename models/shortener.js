const mongoose=require('mongoose');
const shortid=require('shortid');

const Schema=mongoose.Schema;

const shortenerScheme=new Schema({
    _id:{
        type: String,
        default: shortid.generate
    },
    url:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports=mongoose.model('Shortener', shortenerScheme);