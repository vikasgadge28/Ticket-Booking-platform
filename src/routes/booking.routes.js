import express from "express";
const router = express.Router();
import { bookSeats,  getUserBookings, cancelBooking } from "../controllers/booking.Controller.js";

// Book Train Seats
router.post('/:train_id/book', bookSeats);

// Optional: Get all bookings for a user
router.get('/user/:user_id', getUserBookings);

// Optional: Cancel a booking
router.delete('/:booking_id/cancel', cancelBooking);

export default router;