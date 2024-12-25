import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IComment extends Document {
    sender: string;
    content: string;
    postId: mongoose.Types.ObjectId;
}

const commentSchema: Schema<IComment> = new mongoose.Schema(
    {
        sender: { type: String, required: true, trim: true },
        content: { type: String, required: true, trim: true },
        postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    },
  );

const Comment: Model<IComment> = mongoose.model<IComment>('Comment', commentSchema);
export default Comment;
