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
    ["clean"]
  ]
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
    console.log({ title, details, tags });
    setTitle("");
    setDetails("");
    setTags([]);
    setTagInput("");
  };

  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.heading}>Ask a Question</h1>
      <p className={styles.subtitle}>
        Share your knowledge and get help from the community.<br />
        Whether you're stuck on a problem or want to learn something new, we're here to help.
      </p>
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
                placeholder="What's your question? Be specific and imagine you're asking a friend"
                required
              />
              <span className={styles.helper}>
                Make your title clear and specific to help others understand your question
              </span>
            </label>
            <label className={styles.label}>
              Question Details
              <ReactQuill
                value={details}
                onChange={setDetails}
                placeholder="Describe your question in detail..."
                className={styles.richTextEditor}
                theme="snow"
                modules={quillModules}
              />
            </label>
            <label className={styles.label}>
              Tags
              <span className={styles.helper}>
                Add up to 5 tags to categorize your question
              </span>
              <div className={styles.tagsInputWrap}>
                <input
                  className={styles.input}
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add tags (e.g., React, JWT)"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag(tagInput.trim());
                    }
                  }}
                />
                <div className={styles.tagsRow}>
                  {tags.map((tag) => (
                    <span className={styles.tagChip} key={tag}>
                      {tag}
                      <button
                        type="button"
                        className={styles.removeTag}
                        onClick={() => removeTag(tag)}
                        aria-label={`Remove ${tag}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.helper} style={{ marginTop: "1rem" }}>
                Suggested tags:
              </div>
              <div className={styles.suggestions}>
                {suggestedTags.map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    className={styles.suggestion}
                    disabled={tags.includes(tag) || tags.length >= 5}
                    onClick={() => addTag(tag)}
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </label>
            <div className={styles.actions}>
              <button type="button" className={styles.cancelBtn}>
                Cancel
              </button>
              <button type="submit" className={styles.submitBtn}>
                Submit Question
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;
