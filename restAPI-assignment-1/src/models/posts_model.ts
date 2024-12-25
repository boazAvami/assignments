import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IPost extends Document {
    sender: string;
    content: string;
    comments: mongoose.Types.ObjectId[];
}

const postSchema: Schema<IPost> = new mongoose.Schema(
    {
        sender: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment',
            },
        ],
    }
);

const Post: Model<IPost> = mongoose.model<IPost>('Post', postSchema);
export default Post;
