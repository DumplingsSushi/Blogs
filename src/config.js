const mongoose = require('mongoose');
const { type } = require('os');
const connect=mongoose.connect("mongodb://localhost:27017/admin",);

connect.then(()=>{
    console.log("Database connected successfully");
})
.catch((error)=>{
    console.log("Database connection failed: ", error.message);
});

const signupSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  photo: String,
  artist: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'collection' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'like' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }]
});

const likeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'collection' },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

const commentSchema = new mongoose.Schema({
  content: String,
  by:String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'collection' },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

const post = mongoose.model('Post', postSchema);
const like = mongoose.model('Like', likeSchema);
const comment = mongoose.model('Comment', commentSchema);
const collection = new mongoose.model("users",signupSchema);
module.exports={collection,post,like,comment};