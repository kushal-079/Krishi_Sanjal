import React, { useState , useEffect} from 'react';
import { assets } from '../../assets/assets';
import './Profile2.css';
import ProfileUpdate2 from '../../Components/ProfileUpdate2/ProfileUpdate2';

const Profile2 = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState('');
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUsername(data.username);
          if (data.profileImage) {
            setProfileImage(`http://localhost:5000${data.profileImage}`);
          }
        } else {
          console.error('Failed to fetch profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className={`user-profile-container ${showUpdate ? 'expanded' : ''}`}>
      {showUpdate ? (
        <ProfileUpdate2
        username={username}
        setUsername={setUsername}
        setShowUpdate={setShowUpdate}
        onProfileUpdate={(updatedImage) => setProfileImage(updatedImage)}
          handleImageChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                setProfileImage(reader.result);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
      ) : (
        <div className="profile-wrapper">
          <div className="profile-image-wrapper">
            <img
              src={profileImage || assets.profileimg}
              alt="Profile"
              className="profile-image"
            />
          </div>
          <div className="username">
            <p>{username}</p>
          </div>
          <div className="profile-actions">
            <button className="btn edit-btn" onClick={() => setShowUpdate(true)}>Update</button>
            <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile2;