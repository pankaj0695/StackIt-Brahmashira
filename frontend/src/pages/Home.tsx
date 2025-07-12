import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainContent from "../components/Home/MainContent";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  return (
    <div className={styles["home-bg"]}>
      <main className={styles["home-main"]}>
        <MainContent
          page={page}
          setPage={setPage}
          onAskQuestion={() => navigate("/ask-question")}
        />
      </main>
    </div>
  );
};

export default Home;
