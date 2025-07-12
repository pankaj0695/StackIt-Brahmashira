import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainContent from "../components/Home/MainContent";

const Home: React.FC = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "none",
        margin: 0,
        padding: 0,
      }}
    >
      <MainContent
        page={page}
        setPage={setPage}
        onAskQuestion={() => navigate("/ask-question")}
      />
    </div>
  );
};

export default Home;
