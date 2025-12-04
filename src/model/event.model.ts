// Event.model.ts (chỉnh lại 1 chút)
import { Schema, model, Document, Types } from "mongoose";

export type TicketTypeName = "VIP" | "NORMAL";

export interface IEvent extends Document {
  title: string;
  category: "concert" | "workshop" | "theater";
  organizerId: Types.ObjectId;
  startTime: Date;
  endTime: Date;
  // bỏ price tổng quát, thay bằng ticketTypes
  ticketTypes: {
    type: TicketTypeName;
    price: number;
    totalTickets: number;
    soldTickets: number;
  }[];
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

    startTime: Date,
    endTime: Date,

    ticketTypes: [
      {
        type: {
          type: String,
          enum: ["VIP", "NORMAL"],
          required: true,
        },
        price: { type: Number, required: true },
        totalTickets: { type: Number, required: true },
        soldTickets: { type: Number, required: true },
      },
    ],

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