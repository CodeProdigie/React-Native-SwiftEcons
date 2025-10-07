import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ISecretKey extends Document {
  user: Types.ObjectId;
  key: string;
}

const SecretKeySchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  key: { type: String, required: true, unique: true },
});

export default mongoose.model<ISecretKey>('SecretKey', SecretKeySchema);
