import express from "express";
import { isAdmin, authenticate } from "../middlewares/verifyToken.js"; // Ensure this path is correct
import {
  addTrain,
  getTrainAvailability,
  getAllTrains,
  deleteTrain,
  updateSeatAvailability
} from "../controllers/trains.controller.js"; // Import your train controller methods

const router = express.Router();

// Route to add a new train, accessible only by admins
router.post("/new-create",  addTrain);

router.get('/all-trains', getAllTrains);
// Route to update train seat capacity, accesible only by admins


// Route to get train availability based on source and destination
router.get("/availability", getTrainAvailability);



router.delete('/delete/:id', deleteTrain);


router.patch('/update-seats/:id', updateSeatAvailability);

export default router;
