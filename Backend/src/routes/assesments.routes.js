import express from "express";
import assessmentController from "../controller/assessment.controller.js";
import usermiddleware from "../middleware/user.middleware.js";
const assesmentrouter = express.Router();

assesmentrouter.post(
  "/submit-phq9",
  usermiddleware.user,
  assessmentController.submitPHQ9,
);

assesmentrouter.post(
  "/submit-gad7",
  usermiddleware.user,
  assessmentController.submitGAD7,
);

export default assesmentrouter;
