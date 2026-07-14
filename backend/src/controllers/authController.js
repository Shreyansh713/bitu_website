const Admin = require("../models/Admin");
const generateToken = require("../utils/generateToken");

async function loginAdmin(req, res) {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin || !(await admin.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({
    token: generateToken(admin._id),
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email
    }
  });
}

async function getProfile(req, res) {
  res.json({ admin: req.admin });
}

module.exports = { loginAdmin, getProfile };
