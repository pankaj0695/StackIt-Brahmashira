import React, { useState } from 'react';
import { dummyQuestions } from './DummyQuests'

const QUESTIONS_PER_PAGE = 5;

const MainContent: React.FC<{
  page: number;
  setPage: (p: number) => void;
  onAskQuestion: () => void;
}> = ({ page, setPage, onAskQuestion }) => {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'all' | 'new'>('all');

  // Filter and paginate questions
  const filtered = dummyQuestions
    .filter(q =>
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.description.toLowerCase().includes(search.toLowerCase()) ||
      q.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    );
  const start = (page - 1) * QUESTIONS_PER_PAGE;
  const paginated = filtered.slice(start, start + QUESTIONS_PER_PAGE);
  const totalPages = Math.ceil(filtered.length / QUESTIONS_PER_PAGE);

  return (
    <div className="main-content">
      <div className="question-tabs">
        <button
          className={`tab-btn${tab === 'all' ? ' active' : ''}`}
          onClick={() => setTab('all')}
        >
          All Questions
        </button>
        <button
          className={`tab-btn${tab === 'new' ? ' active' : ''}`}
          onClick={() => setTab('new')}
        >
          Newly Added
        </button>
        <button className="ask-btn" onClick={onAskQuestion}>
          Ask New Question
        </button>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="questions-list">
        {paginated.length === 0 && (
          <div className="no-questions">No questions found.</div>
        )}
        {paginated.map(q => (
          <div className="question-card" key={q.id}>
            <div className="question-header">
              <h3>{q.title}</h3>
              <span className="answers-count">{q.answers} ans</span>
            </div>
            <div className="question-desc">{q.description}</div>
            <div className="question-meta">
              <div className="tags">
                {q.tags.map(tag => (
                  <span className="tag" key={tag}>{tag}</span>
                ))}
              </div>
              <span className="user">Asked by {q.user}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-bottom">
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="page-btn"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              {'<'}
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`page-btn${page === i + 1 ? ' active' : ''}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="page-btn"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              {'>'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;