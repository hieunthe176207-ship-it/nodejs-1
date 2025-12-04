// Booking.model.ts
import { Schema, model, Document, Types } from "mongoose";
import { TicketTypeName } from "./event.model";
export interface IBookingTicket {
  seatType: TicketTypeName; // "VIP" | "NORMAL"
  quantity: number;
  unitPrice: number;
}

export interface IBooking extends Document {
  userId: Types.ObjectId;
  eventId: Types.ObjectId;
  status: "pending" | "paid" | "cancelled";
  tickets: IBookingTicket[];
  totalAmount: number;
  paymentMethod: "momo" | "credit_card" | "cash";
  createdAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
    },
    tickets: [
      {
        seatType: {
          type: String,
          enum: ["VIP", "NORMAL"], // CHỈ VIP & NORMAL
          required: true,
        },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["momo", "credit_card", "cash"],
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

 const Booking = model<IBooking>("Booking", bookingSchema);

export default Booking;