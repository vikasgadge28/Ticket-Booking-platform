/** @format */

import Train from "../models/trains.model.js"; // Ensure this path is correct
import Booking from "../models/trains.model.js"; // Ensure you have a Booking model
import mongoose from "mongoose";

export const getAllTrains = async (req, res) => {
  try {
    const trains = await Train.find(); // Fetch all train documents
    res.status(200).json({
      success: true,
      message: "Trains retrieved successfully",
      data: trains,
    });
  } catch (error) {
    console.error("Error while fetching trains:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve trains",
      error: error.message,
    });
  }
};

// Function to add a new train
export const addTrain = async (req, res) => {
  const {
    train_name,
    source,
    destination,
    seat_capacity,
    arrival_time_at_source,
    arrival_time_at_destination,
  } = req.body;
  try {
    const train = new Train({
      train_name,
      source,
      destination,
      seat_capacity,
      arrival_time_at_source,
      arrival_time_at_destination,
    });
    console.log(
      train_name,
      source,
      destination,
      seat_capacity,
      arrival_time_at_source,
      arrival_time_at_destination
    );
    await train.save();
    res.status(201).json({
      success: true,
      message: "Train added successfully",
      data: { trainid: train._id },
    });
  } catch (error) {
    console.error("Error while adding train:", error);
    res
      .status(500)
      .json({ message: "Failed to add train", error: error.message });
  }
};

// Function to update seats
export const updateSeatAvailability = async (req, res) => {
  const { id } = req.params; // Train ID from URL parameters
  const { seat_capacity } = req.body; // New seat capacity from request body

  try {
    // Find the train by ID and update the seat capacity
    const updatedTrain = await Train.findByIdAndUpdate(
      id,
      { seat_capacity },
      { new: true, runValidators: true }
    );

    if (!updatedTrain) {
      return res.status(404).json({ message: 'Train not found.' });
    }

    res.status(200).json({ message: 'Seat capacity updated successfully.', data: updatedTrain });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update seat capacity.', error: error.message });
  }
};

// Function to get train availability
export const getTrainAvailability = async (req, res) => {
  const { source, destination } = req.query;

  try {
    const trains = await Train.find({ source, destination });
    if (trains.length === 0)
      return res
        .status(404)
        .json({ message: "No trains available for the specified route" });

    const availableTrains = trains.map((train) => ({
      train_id: train._id,
      train_name: train.train_name,
      available_seats: train.seat_capacity,
    }));
    res.status(200).json(availableTrains);
  } catch (error) {
    console.error("Error while fetching train availability:", error);
    res.status(500).json({
      message: "Failed to fetch train availability",
      error: error.message,
    });
  }
};



export const deleteTrain = async (req, res) => {
  const { id } = req.params; // Extract train ID from URL parameters

  try {
    const deletedTrain = await Train.findByIdAndDelete(id);

    if (!deletedTrain) {
      return res.status(404).json({ message: 'Train not found.' });
    }

    res.status(200).json({ message: 'Train deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete train.', error: error.message });
  }
};