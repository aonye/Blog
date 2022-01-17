import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let PostSchema = new Schema(
    {
        author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        title: { type: String, required: true, maxlength: 30 },
        timestamp: { type: Date, required: true },
        post: { type: String, required: true, maxlength: 10000 },
        published: { type: Boolean },
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
    }
);

export default mongoose.model('Post', PostSchema);