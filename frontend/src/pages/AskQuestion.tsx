import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import styles from "./AskQuestion.module.css";

const suggestedTags = ["react", "css", "help", "typescript", "html", "node.js"];

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

const AskQuestion: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to backend)
    setTitle("");
    setDetails("");
    setTags([]);
    setTagInput("");
  };

  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.heading}>Ask a Question</h1>
      <div className={styles.container}>
        <div className={styles.card}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>
              <span>
                Question Title <span style={{ color: "#ef4444" }}>*</span>
              </span>
              <input
                className={styles.input}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Be specific and imagine you’re asking another person"
                required
                style={{
                  background: "#f8fafc",
                  border: "1.5px solid #a5b4fc",
                  borderRadius: 8,
                }}
              />
            </label>
            <label className={styles.label}>
              <span>
                Details <span style={{ color: "#ef4444" }}>*</span>
              </span>
              <ReactQuill
                value={details}
                onChange={setDetails}
                modules={quillModules}
                theme="snow"
                style={{
                  background: "#f8fafc",
                  borderRadius: 8,
                  marginBottom: 12,
                }}
              />
            </label>
            <label className={styles.label}>
              <span>Tags (up to 5)</span>
              <div className={styles.tagInputWrap}>
                <input
                  className={styles.input}
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && tagInput.trim()) {
                      e.preventDefault();
                      addTag(tagInput.trim());
                    }
                  }}
                  placeholder="Add a tag and press Enter"
                  style={{
                    background: "#f8fafc",
                    border: "1.5px solid #a5b4fc",
                    borderRadius: 8,
                  }}
                />
                <div className={styles.suggestedTags}>
                  {suggestedTags.map((tag) => (
                    <span
                      key={tag}
                      className={styles.suggestedTag}
                      onClick={() => addTag(tag)}
                      style={{
                        background:
                          "linear-gradient(90deg, #a5b4fc 0%, #6366f1 100%)",
                        color: "#fff",
                        borderRadius: 6,
                        padding: "2px 12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        marginRight: 6,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.tagsList}>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className={styles.tag}
                    style={{
                      background:
                        "linear-gradient(90deg, #a5b4fc 0%, #6366f1 100%)",
                      color: "#fff",
                      borderRadius: 6,
                      padding: "2px 12px",
                      fontWeight: 600,
                      marginRight: 6,
                    }}
                  >
                    {tag}
                    <span
                      className={styles.removeTag}
                      onClick={() => removeTag(tag)}
                      style={{
                        marginLeft: 8,
                        color: "#ef4444",
                        cursor: "pointer",
                        fontWeight: 700,
                      }}
                    >
                      ×
                    </span>
                  </span>
                ))}
              </div>
            </label>
            <button
              type="submit"
              className={styles.submitBtn}
              style={{
                background: "linear-gradient(90deg, #a5b4fc 0%, #6366f1 100%)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1.1rem",
                border: "none",
                borderRadius: 8,
                padding: "0.8em 2em",
                marginTop: 12,
              }}
            >
              Post Your Question
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;
