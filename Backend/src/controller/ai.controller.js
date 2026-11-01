import axios from "axios";

const chatgroq = async (req, res) => {
  try {
    const { phq9, gad7 } = req.body;
    if (!phq9 || !gad7) {
      return res.status(400).json({
        message: "PHQ-9 and GAD-7 results are required",
      });
    }
    const response = await axios.post(`${process.env.AI_SERVICE_URL}/ai/chat`, {
      phq9,
      gad7,
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("AI Service Error:", error.message);

    res.status(500).json({
      message: "AI service unavailable",
    });
  }
};

const chatbot = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({
        message: "No question has asked",
      });
    }
    const response = await axios.post(`${process.env.AI_SERVICE_URL}/ai/chatbot`, {
     question
    });
    res.status(200).json(response.data);
  } catch (err) {
    console.log("Ai service error: ", err.message);
    res.status(500).json({
      message: "Chatbot is not responding",
    });
  }
};

export default { chatgroq, chatbot };
