
import { Schema, model, Document, Types } from "mongoose";

export interface IReview extends Document {
  userId: Types.ObjectId;
  eventId: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    rating: Number,
    comment: String,
    createdAt: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Review = model<IReview>("Review", reviewSchema);
export default Review;