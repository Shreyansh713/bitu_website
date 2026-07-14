const dotenv = require("dotenv");
const connectDB = require("../config/db");
const Admin = require("../models/Admin");

dotenv.config();

async function seedAdmin() {
  await connectDB();

  const email = process.env.ADMIN_EMAIL || "admin@bitto.local";
  const existingAdmin = await Admin.findOne({ email });

  if (existingAdmin) {
    console.log(`Admin already exists: ${email}`);
    process.exit(0);
  }

  await Admin.create({
    name: process.env.ADMIN_NAME || "Bitto Admin",
    email,
    password: process.env.ADMIN_PASSWORD || "admin123"
  });

  console.log(`Admin created: ${email}`);
  process.exit(0);
}

seedAdmin().catch((error) => {
  console.error(error);
  process.exit(1);
});
