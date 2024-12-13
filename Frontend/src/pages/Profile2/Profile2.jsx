import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import './Profile2.css';
import ProfileUpdate2 from '../../Components/ProfileUpdate2/ProfileUpdate2';

const Profile2 = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState('Username');
  const [showUpdate, setShowUpdate] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const logout = () => {
    console.log("Logged out");
  };

  return (
    <div className={`user-profile-container ${showUpdate ? 'expanded' : ''}`}>
      {showUpdate ? (
        <ProfileUpdate2 username={username} setUsername={setUsername} setShowUpdate={setShowUpdate}
        handleImageChange={handleImageChange}
        />
      ) : (
        <div className="profile-wrapper">
          <div className="profile-image-wrapper">
          <img
              src={profileImage || assets.profileimg}
              alt="Profile"
              className="profile-image"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              id="fileInput"
            />
          </div>
          <div className="username">
            <p>{username}</p>
          </div>
          <div className="profile-actions">
            <button className="btn edit-btn" onClick={() => setShowUpdate(true)}>Update</button>
            <button className="btn logout-btn" onClick={logout}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile2;