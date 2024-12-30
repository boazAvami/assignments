import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IComment extends Document {
    userId: mongoose.Types.ObjectId;
    content: string;
    postId: mongoose.Types.ObjectId;
}

const commentSchema: Schema<IComment> = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        content: { type: String, required: true, trim: true },
        postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    },
  );

const Comment: Model<IComment> = mongoose.model<IComment>('Comment', commentSchema);
export default Comment;
