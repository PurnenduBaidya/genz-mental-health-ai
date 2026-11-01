import User from "../model/user.js";
import Assessment from "../model/assessments.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const registeruser = async (req, res) => {
  const { name, email, password } = req.body;
  const isAlreadyExist = await User.findOne({ email });
  if (isAlreadyExist) {
    return res.status(400).json({ message: "User already registered" });
  }
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hash,
  });
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("token", token);
  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user.id,
      username: user.name,
      email: user.email,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const ismatch = await bcrypt.compare(password, user.password);
  if (!ismatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("token", token);
  res.status(200).json({
    message: "Login successful",
    user: {
      id: user.id,
      username: user.name,
      email: user.email,
    },
  });
};

const user = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const phq9 = await Assessment.findOne({
      user: req.user.id,
      type: "PHQ-9",
    }).sort({ createdAt: -1 });

    const gad7 = await Assessment.findOne({
      user: req.user.id,
      type: "GAD-7",
    }).sort({ createdAt: -1 });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      success: true,
      message: `User: ${user.name}`,
      profile: {
        name: user.name,
        email: user.email,
      },
      Score: {
        PHQ9: phq9
          ? {
              score: phq9.score,
              severity: phq9.severity,
            }
          : null,
        GAD7: gad7
          ? {
              score: gad7.score,
              severity: gad7.severity,
            }
          : null,
        percentage: {
          percentage:
            phq9 && gad7 ? ((((phq9.score + gad7.score) / 48) * 100).toFixed(2)) : null,
        },
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const assessment = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const phq9 = await Assessment.find({
      user: req.user.id,
      type: "PHQ-9",
    })
      .sort({ createdAt: -1 })
      .skip(1)
      .limit(2);

    const gad7 = await Assessment.find({
      user: req.user.id,
      type: "GAD-7",
    })
      .sort({ createdAt: -1 })
      .skip(1)
      .limit(2);

    return res.status(200).json({
      success: true,
      Score: {
        PHQ9: phq9.map((item) => ({
          score: item.score,
          severity: item.severity,
          createdAt: item.createdAt,
        })),
        GAD7: gad7.map((item) => ({
          score: item.score,
          severity: item.severity,
          createdAt: item.createdAt,
        })),
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};

export default { registeruser, login, logout, user, assessment };
