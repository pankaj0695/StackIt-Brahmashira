import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AskQuestion from "./pages/AskQuestion";
import AnswerQuestion from "./pages/AnswerQuestion";
import UserProfile from "./pages/UserProfile";

const dummyQuestions = [
  {
    id: 1,
    title: "What is React?",
    description: "Can someone explain what React is in simple terms?",
    tags: ["react", "javascript", "frontend"],
    likes: 3,
    answers: [
      {
        id: 1,
        text: "React is a JavaScript library for building UIs.",
        upvotes: 2,
        downvotes: 0,
      },
      {
        id: 2,
        text: "It's a tool for making interactive web apps.",
        upvotes: 1,
        downvotes: 0,
      },
    ],
  },
  {
    id: 2,
    title: "How to use useState?",
    description: "I'm confused about how useState works in React.",
    tags: ["react", "hooks"],
    likes: 1,
    answers: [
      {
        id: 3,
        text: "useState lets you add state to functional components.",
        upvotes: 2,
        downvotes: 1,
      },
    ],
  },
];

function App() {
  const [questions, setQuestions] = useState(dummyQuestions);

  // Dummy handlers for UI only (no backend)
  const onLikeQuestion = (questionId: number) => {
    setQuestions((qs) =>
      qs.map((q) => (q.id === questionId ? { ...q, likes: q.likes + 1 } : q))
    );
  };

  const onAddAnswer = (questionId: number, answer: string) => {
    setQuestions((qs) =>
      qs.map((q) =>
        q.id === questionId
          ? {
              ...q,
              answers: [
                ...q.answers,
                {
                  id: Date.now(),
                  text: answer,
                  upvotes: 0,
                  downvotes: 0,
                },
              ],
            }
          : q
      )
    );
  };

  const onVoteAnswer = (
    questionId: number,
    answerId: number,
    type: "up" | "down"
  ) => {
    setQuestions((qs: any) =>
      qs.map((q: any) =>
        q.id === questionId
          ? {
              ...q,
              answers: q.answers.map((a: any) =>
                a.id === answerId
                  ? {
                      ...a,
                      upvotes: type === "up" ? a.upvotes + 1 : a.upvotes,
                      downvotes:
                        type === "down" ? a.downvotes + 1 : a.downvotes,
                    }
                  : a
              ),
            }
          : q
      )
    );
  };

  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ask-question" element={<AskQuestion />} />
        <Route
          path="/answer-question"
          element={
            <AnswerQuestion
              questions={questions}
              onLikeQuestion={onLikeQuestion}
              onAddAnswer={onAddAnswer}
              onVoteAnswer={onVoteAnswer}
            />
          }
        />
        <Route path="/user" element={<UserProfile />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
