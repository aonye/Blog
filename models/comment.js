import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let CommentSchema = new Schema(
    {
        author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        comment: { type: String, required: true, minlength: 1, maxlength: 1000 },
        timestamp: { type: Date, required: true },
    }
);

// Schema
//     .virtual('url')
//     .get(function () {
//         return '//' + this._id;
//     });

// Schema
//     .virtual('timestamp_format')
//     .get(function () {
//         return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_SHORT);
//     });

export default mongoose.model('Comment', CommentSchema);