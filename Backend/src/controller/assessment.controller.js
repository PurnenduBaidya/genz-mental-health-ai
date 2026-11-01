import assessment from "../model/assessments.js";

const submitPHQ9 = async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || answers.length !== 9) {
      return res.status(400).json({
        message: "PHQ-9 requires exactly 9 answers",
      });
    }

    const invalidAnswer = answers.some(
      (answer) => !Number.isInteger(answer) || answer < 0 || answer > 3,
    );

    if (invalidAnswer) {
      return res.status(400).json({
        message: "Each answer must be between 0 and 3",
      });
    }

    const score = answers.reduce((total, answer) => total + answer, 0);

    let severity;

    if (score <= 4) {
      severity = "Minimal";
    } else if (score <= 9) {
      severity = "Mild";
    } else if (score <= 14) {
      severity = "Moderate";
    } else if (score <= 19) {
      severity = "Moderately severe";
    } else {
      severity = "Severe";
    }

    const Assessment = await assessment.create({
      user: req.user.id,
      type: "PHQ-9",
      answers,
      score,
      severity,
    });

    res.status(201).json({
      message: "PHQ-9 assessment submitted",
      result: {
        score,
        severity,
        type: Assessment.type,
        assessmentId: Assessment._id,
        userId: Assessment.user,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to submit PHQ-9 assessment",
    });
  }
};

const submitGAD7 = async (req, res) => {
  const { answers } = req.body;
  try {
    if (!answers || answers.length !== 7) {
      return res.status(400).json({
        message: "GAD-7 requires exactly 7 answers",
      });
    }
    const invalidAnswer = answers.some(
      (answer) => !Number.isInteger(answer) || answer < 0 || answer > 3,
    );

    if (invalidAnswer) {
      return res.status(400).json({
        message: "Each answer must be between 0 and 3",
      });
    }

    const score = answers.reduce((total, answer) => total + answer, 0);

    let severity;

    if (score <= 4) {
  severity = "Minimal";
} else if (score <= 9) {
  severity = "Mild";
} else if (score <= 14) {
  severity = "Moderate";
} else {
  severity = "Severe";
}

    const Assessment = await assessment.create({
      user: req.user.id,
      type: "GAD-7",
      answers,
      score,
      severity,
    });

    res.status(201).json({
      message: "GAD-7 assessment submitted",
      result: {
        score,
        severity,
        type: Assessment.type,
        assessmentId: Assessment._id,
        userId: Assessment.user,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to submit GAD-7 assessment",
    });
  }
};


export default { submitPHQ9, submitGAD7 };
