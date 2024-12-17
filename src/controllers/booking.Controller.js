import Booking from "../models/booking.model.js"; 
import Train from "../models/trains.model.js";
import { v4 as uuidv4 } from "uuid";
// Function to handle booking train seats
export const bookSeats = async (req, res) => {
  const { train_id } = req.params;
  const { user_id, no_of_seats } = req.body;

  try {
    // Step 1: Check for train availability
    const train = await Train.findById(train_id);
    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }
    if (train.available_seats < no_of_seats) {
      return res.status(400).json({ message: "Not enough available seats" });
    }

    // Step 2: Reserve the seats
      train.seats = [1, 2, 3, 4, 5, 6,7,8,9,10,11,12,13,14];
    const seatNumbers = train.seats.slice(0, no_of_seats); // Extract seats
    const bookingId = uuidv4();

    // Step 3: Create new booking
    const newBooking = new Booking({
      booking_id: bookingId,
      train_id: train._id,
      user_id: user_id,
      no_of_seats: no_of_seats,
      seat_numbers: seatNumbers,
      arrival_time_at_source: train.arrival_time_at_source,
      arrival_time_at_destination: train.arrival_time_at_destination,
    });

    await newBooking.save();

    // Step 4: Update available seats and train seat list
    train.seat_capacity -= no_of_seats;
    train.seats = train.seats.slice(no_of_seats); // Remove reserved seats
    await train.save();

    // Step 5: Send confirmation response
    res.status(200).json({
      booking_id: newBooking.booking_id,
      seat_numbers: newBooking.seat_numbers,
    });
  } catch (error) {
    console.error("Error during booking:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


// Function to get all bookings for a specific user
export const getUserBookings = async (req, res) => {
  const { user_id } = req.params;
console.log(user_id)
  try {
    const bookings = await Booking.find({ user_id }).populate('train_id');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
};

// Function to cancel a booking
export const cancelBooking = async (req, res) => {
  const { booking_id } = req.params;

  try {
    const booking = await Booking.findById(booking_id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Update available seats in Train
    const train = await Train.findById(booking.train_id);
    train.available_seats += booking.no_of_seats;
    await train.save();

    await Booking.findByIdAndDelete(booking_id);
    res.status(200).json({ message: "Booking canceled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error canceling booking", error: error.message });
  }
};
