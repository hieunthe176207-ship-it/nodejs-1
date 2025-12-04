import { Schema, model, Document, Types } from "mongoose";

export interface IEvent extends Document {
  title: string;
  category: "concert" | "workshop" | "theater";
  organizerId: Types.ObjectId;
  startTime: Date;
  endTime: Date;
  price: number;      // giá 1 vé
  quantity: number;   // tổng số vé (1 loại vé duy nhất)
  tags: string[];
  venue: {
    name: string;
    city: string;
    address: string;
    capacity: number;
  };
  createdAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["concert", "workshop", "theater"],
      required: true,
    },
    organizerId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },

    price: { type: Number, required: true },    // 1 loại vé
    quantity: { type: Number, required: true }, // tổng số vé có thể bán

    tags: [String],

    venue: {
      name: String,
      city: String,
      address: String,
      capacity: Number,
    },

    createdAt: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Event = model<IEvent>("Event", eventSchema);
export default Event;
