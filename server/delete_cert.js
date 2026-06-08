const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { dbConnect } = require("./configs/database");
const Certificate = require("./models/certificate");

async function run() {
  await dbConnect();
  
  const result = await Certificate.deleteOne({ certificateNumber: "VP-2026-82CA6CA92E" });
  console.log("Deleted certificate:", result);

  process.exit(0);
}
run();
