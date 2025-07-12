import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import styles from "./UserProfile.module.css";

const UserProfile: React.FC = () => {
  const { user, updateProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateProfile(editedUser);
    setIsEditing(false);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className={styles["user-profile-container"]}>
      <div className={styles["profile-header"]}>
        <div className={styles["profile-identity"]}>
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleInputChange}
                className={styles["profile-edit-input"]}
                placeholder="Full name"
              />
              <input
                type="text"
                name="username"
                value={editedUser.username}
                onChange={handleInputChange}
                className={styles["profile-edit-input"]}
                placeholder="Username"
              />
            </>
          ) : (
            <>
              <h2 className={styles["profile-name"]}>{user.name}</h2>
              <p className={styles["profile-username"]}>@{user.username}</p>
            </>
          )}
        </div>

        <div className={styles["profile-actions"]}>
          {isEditing ? (
            <div className={styles["edit-buttons"]}>
              <button
                className={styles["cancel-btn"]}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button className={styles["save-btn"]} onClick={handleSave}>
                Save Profile
              </button>
            </div>
          ) : (
            <button
              className={styles["edit-btn"]}
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className={styles["profile-content"]}>
        <div className={styles["profile-details"]}>
          <div className={styles["detail-row"]}>
            <span className={styles["detail-label"]}>Email:</span>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
                className={styles["profile-edit-input"]}
              />
            ) : (
              <span className={styles["detail-value"]}>{user.email}</span>
            )}
          </div>

          <div className={styles["detail-row"]}>
            <span className={styles["detail-label"]}>Role:</span>
            <span className={`${styles["role-badge"]} ${user.role}`}>
              {user.role}
            </span>
          </div>

          <div className={`${styles["detail-row"]} ${styles["bio-row"]}`}>
            <span className={styles["detail-label"]}>Bio:</span>
            {isEditing ? (
              <textarea
                name="bio"
                value={editedUser.bio || ""}
                onChange={handleInputChange}
                className={styles["profile-edit-textarea"]}
                placeholder="Tell others about yourself"
              />
            ) : (
              <p className={`${styles["detail-value"]} ${styles["bio-text"]}`}>
                {user.bio || "No bio provided"}
              </p>
            )}
          </div>
        </div>

        <div className={styles["profile-stats"]}>
          <div className={styles["stat-box"]}>
            <span className={styles["stat-number"]}>{user.followers}</span>
            <span className={styles["stat-label"]}>Followers</span>
          </div>
          <div className={styles["stat-box"]}>
            <span className={styles["stat-number"]}>{user.following}</span>
            <span className={styles["stat-label"]}>Following</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
