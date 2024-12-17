/** @format */

import mongoose from "mongoose";

const trainSchema = new mongoose.Schema({
  train_name: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  seat_capacity: {
    type: Number,
    required: true,
  },
  arrival_time_at_source: {
    type: String,
    required: true,
    match: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
  },
  arrival_time_at_destination: {
    type: String,
    required: true,
    match: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
  },
});


const train = mongoose.model("Train", trainSchema);

export default train;
