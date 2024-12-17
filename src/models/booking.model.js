/** @format */
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(

  {
    booking_id: { type: String, required: true, unique: true },
    train_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Train",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    no_of_seats: { type: Number, required: true },
    seat_numbers: { type: [Number], required: true },
    arrival_time_at_source: { type: String, required: true },
    arrival_time_at_destination: { type: String, required: true },
  },
  { timestamps: true }
);

const booking = mongoose.model("Booking", bookingSchema);
export default booking;
