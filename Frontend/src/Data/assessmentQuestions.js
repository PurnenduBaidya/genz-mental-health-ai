const options = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 },
];

export const assessmentQuestions = {
  "phq-9": {
    type: "PHQ-9",
    title: "Mood Check-In",
    description: "Think about how you've been feeling over the last 2 weeks.",
    questions: [
      "Little interest or pleasure in doing things.",
      "Feeling down, depressed, or hopeless.",
      "Trouble falling or staying asleep, or sleeping too much.",
      "Feeling tired or having little energy.",
      "Poor appetite or overeating.",
      "Feeling bad about yourself — or that you are a failure or have let yourself or your family down.",
      "Trouble concentrating on things, such as reading or watching television.",
      "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual.",
      "Thoughts that you would be better off dead, or of hurting yourself in some way.",
    ],
    options,
  },

  "gad-7": {
    type: "GAD-7",
    title: "Anxiety Check-In",
    description: "Think about how you've been feeling over the last 2 weeks.",
    questions: [
      "Feeling nervous, anxious, or on edge.",
      "Not being able to stop or control worrying.",
      "Worrying too much about different things.",
      "Trouble relaxing.",
      "Being so restless that it is hard to sit still.",
      "Becoming easily annoyed or irritable.",
      "Feeling afraid, as if something awful might happen.",
    ],
    options,
  },
};