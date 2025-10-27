const QuestionnaireSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Dropdown of majors (enum)
    Major: {
      type: String,
      enum: [
        "Computer Science",
        "Information Technology",
        "Cybersecurity",
        "Business",
        "Engineering",
        "Biology",
        "Psychology",
        "Undeclared"
      ],
      default: null,
    },

    // Yes/No question
    Gym: {
      type: Boolean,
      default: null,
    },

    // Hobby selection
    Hobby: {
      type: [String], //array of strings
      enum: [
        "Gaming",
        "Music",
        "Sports",
        "Reading",
        "Cooking",
        "Art",
        "Traveling",
        "Other"
      ],
      default: null,
    },

    // Yes/No question
    Internship: {
      type: Boolean,
      default: null,
    },
  },
  { timestamps: true }
);

const Questionnaire = mongoose.model("Questionnaire", QuestionnaireSchema);
export default Questionnaire;
