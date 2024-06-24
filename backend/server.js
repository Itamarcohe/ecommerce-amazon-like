import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers

//not found handler

mongoose
    .connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server started on port " + PORT);
        })
    }).catch((err) => {
    console.log(err.message);
})