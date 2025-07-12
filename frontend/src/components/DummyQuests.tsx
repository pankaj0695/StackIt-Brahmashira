export interface DummyQuestion {
  id: number;
  title: string;
  description: string;
  tags: string[];
  user: string;
  answers: number;
}

export const dummyQuestions: DummyQuestion[] = [
  {
    id: 1,
    title: "How to join 2 columns in a data set to make a separate column in SQL?",
    description: "I do not know the code for it as I am a beginner. As an example what I need to do is like there is a column 1 containing First name, and column 2 consists of last name. I want a column to combine ...",
    tags: ["SQL", "Join"],
    user: "Alice",
    answers: 5,
  },
  {
    id: 2,
    title: "How to center a div in CSS?",
    description: "I want to center a div both vertically and horizontally. What is the best way to do this in modern CSS?",
    tags: ["CSS", "Flexbox"],
    user: "Bob",
    answers: 3,
  },
  {
    id: 3,
    title: "Difference between let, var, and const in JavaScript?",
    description: "Can someone explain the difference between let, var, and const with examples?",
    tags: ["JavaScript", "Variables"],
    user: "Charlie",
    answers: 2,
  },
  {
    id: 4,
    title: "How to use useEffect in React?",
    description: "I am new to React and want to understand how useEffect works and when to use it.",
    tags: ["React", "Hooks"],
    user: "Diana",
    answers: 4,
  },
  {
    id: 5,
    title: "What is the difference between == and === in JavaScript?",
    description: "I often see == and === in code. What is the difference and when should I use each?",
    tags: ["JavaScript", "Comparison"],
    user: "Eve",
    answers: 1,
  },
  {
    id: 6,
    title: "How to install Python packages?",
    description: "I want to install external packages in Python. What is the command and best practices?",
    tags: ["Python", "Pip"],
    user: "Frank",
    answers: 2,
  },
  {
    id: 7,
    title: "How to make a REST API call in JavaScript?",
    description: "What are the ways to make HTTP requests in JavaScript? Should I use fetch or axios?",
    tags: ["JavaScript", "API"],
    user: "Grace",
    answers: 3,
  },
  {
    id: 8,
    title: "What is a closure in JavaScript?",
    description: "I hear about closures a lot. Can someone explain what they are with a simple example?",
    tags: ["JavaScript", "Closures"],
    user: "Henry",
    answers: 2,
  },
  {
    id: 9,
    title: "How to use map and filter in JavaScript?",
    description: "How do map and filter work in JavaScript arrays? Please provide examples.",
    tags: ["JavaScript", "Array"],
    user: "Ivy",
    answers: 4,
  },
  {
    id: 10,
    title: "How to create a responsive layout in CSS?",
    description: "What are the best practices for making a responsive website layout?",
    tags: ["CSS", "Responsive"],
    user: "Jack",
    answers: 1,
  },
];