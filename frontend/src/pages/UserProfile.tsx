import React, { useState } from 'react';
import './UserProfile.css';

interface User {
  _id: string;
  username: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'moderator';
  bio?: string;
  followers: number;
  following: number;
}

interface UserProfileProps {
  user: User;
  onSave: (updatedUser: User) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>({ ...user });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedUser);
    setIsEditing(false);
  };

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <div className="profile-identity">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleInputChange}
                className="profile-edit-input"
                placeholder="Full name"
              />
              <input
                type="text"
                name="username"
                value={editedUser.username}
                onChange={handleInputChange}
                className="profile-edit-input"
                placeholder="Username"
              />
            </>
          ) : (
            <>
              <h2 className="profile-name">{user.name}</h2>
              <p className="profile-username">@{user.username}</p>
            </>
          )}
        </div>

        <div className="profile-actions">
          {isEditing ? (
            <div className="edit-buttons">
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSave}>
                Save Profile
              </button>
            </div>
          ) : (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-details">
          <div className="detail-row">
            <span className="detail-label">Email:</span>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
                className="profile-edit-input"
              />
            ) : (
              <span className="detail-value">{user.email}</span>
            )}
          </div>

          <div className="detail-row">
            <span className="detail-label">Role:</span>
            <span className={`role-badge ${user.role}`}>
              {user.role}
            </span>
          </div>

          <div className="detail-row bio-row">
            <span className="detail-label">Bio:</span>
            {isEditing ? (
              <textarea
                name="bio"
                value={editedUser.bio || ''}
                onChange={handleInputChange}
                className="profile-edit-textarea"
                placeholder="Tell others about yourself"
              />
            ) : (
              <p className="detail-value bio-text">
                {user.bio || 'No bio provided'}
              </p>
            )}
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-box">
            <span className="stat-number">{user.followers}</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{user.following}</span>
            <span className="stat-label">Following</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;