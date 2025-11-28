import express from "express";
import cron from "cron";
import job from "./crons.js";

const app = express();
const PORT = process.env.PORT || 10000;

app.get("/", (req,res)=>res.send("AutoSEO Backend Running"));

job.start();

app.listen(PORT, ()=> console.log("Backend running on "+PORT));
