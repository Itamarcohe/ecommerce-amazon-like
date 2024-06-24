import seedData from "../controllers/seedController.js";
import express from "express";

const seedRouter = express.Router();
seedRouter.get("/", seedData);

export default seedRouter;