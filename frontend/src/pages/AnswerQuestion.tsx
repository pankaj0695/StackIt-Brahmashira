import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import styles from "./AnswerQuestion.module.css";

const quillModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link", "image"],
    ["clean"],
  ],
};

type Answer = {
  id: number;
  text: string; // HTML string
  upvotes: number;
  downvotes: number;
};

type Question = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  likes: number;
  answers: Answer[];
};

type Props = {
  questions: Question[];
  onLikeQuestion: (questionId: number) => void;
  onAddAnswer: (questionId: number, answer: string) => void;
  onVoteAnswer: (
    questionId: number,
    answerId: number,
    type: "up" | "down"
  ) => void;
};

const AnswerQuestion: React.FC<Props> = ({
  questions,
  onLikeQuestion,
  onAddAnswer,
  onVoteAnswer,
}) => {
  const [answerInputs, setAnswerInputs] = useState<{ [key: number]: string }>(
    {}
  );

  const handleInputChange = (questionId: number, value: string) => {
    setAnswerInputs((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleAddAnswer = (questionId: number) => {
    if (answerInputs[questionId]?.replace(/<(.|\n)*?>/g, "").trim()) {
      onAddAnswer(questionId, answerInputs[questionId]);
      setAnswerInputs((prev) => ({ ...prev, [questionId]: "" }));
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.heading}>Welcome to the pool of Creativity</h1>
      <p className={styles.subheading}>
        Answer the questions related to your domain and help each other build a
        community
      </p>
      <div className={styles.cardGrid}>
        {questions.map((q) => (
          <div className={styles.card} key={q.id}>
            <div className={styles.header}>
              <h3>{q.title}</h3>
              <button
                className={styles.likeBtn}
                onClick={() => onLikeQuestion(q.id)}
                aria-label="Like Question"
                title="Like this question"
              >
                <span
                  style={{
                    color: "#e25555",
                    fontSize: "1.3em",
                    marginRight: 4,
                  }}
                >
                  ❤️
                </span>
                {q.likes}
              </button>
            </div>
            <p className={styles.description}>{q.description}</p>
            <div className={styles.tags}>
              {q.tags.map((tag) => (
                <span className={styles.tag} key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className={styles.answerSection}>
              <ReactQuill
                value={answerInputs[q.id] || ""}
                onChange={(value) => handleInputChange(q.id, value)}
                placeholder="Write your answer..."
                className={styles.answerInput}
                theme="snow"
                modules={quillModules}
              />
              <button
                className={styles.submitAnswerBtn}
                onClick={() => handleAddAnswer(q.id)}
                disabled={
                  !answerInputs[q.id]?.replace(/<(.|\n)*?>/g, "").trim()
                }
              >
                Submit Answer
              </button>
            </div>
            <div className={styles.answersList}>
              {q.answers.map((ans) => (
                <div className={styles.answerCard} key={ans.id}>
                  {/* Render HTML safely */}
                  <span dangerouslySetInnerHTML={{ __html: ans.text }} />
                  <div className={styles.voteBtns}>
                    <button
                      onClick={() => onVoteAnswer(q.id, ans.id, "up")}
                      aria-label="Upvote answer"
                      title="Upvote"
                    >
                      👍 {ans.upvotes}
                    </button>
                    <button
                      onClick={() => onVoteAnswer(q.id, ans.id, "down")}
                      aria-label="Downvote answer"
                      title="Downvote"
                    >
                      👎 {ans.downvotes}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnswerQuestion;
