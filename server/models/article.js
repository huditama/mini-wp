const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required!']
    },
    content: {
        type: String,
        required: [true, 'Content is required!']
    },
    createdAt: Date,
    image: String,
    UserId: { type: Schema.Types.ObjectId, ref: 'User' }
})

articleSchema.pre('findOneAndUpdate', function () {
    const { title, content } = this.getUpdate()
    if (!title || !content) throw new Error('Title or Content cannot be empty!')
})

let Article = mongoose.model('Article', articleSchema)

module.exports = Article