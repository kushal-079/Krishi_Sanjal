import React, { useState, useRef } from 'react';
import { assets } from '../../assets/assets';
import './ProfileUpdate2.css';
import Popup2 from '../Popup2/Popup2';


const ProfileUpdate2 = ({ username, setUsername, setShowUpdate, onProfileUpdate }) => {
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('account');
  const [accountData, setAccountData] = useState({
    fullName: '',
    phone: '',
    username: '',
    address1: '',
    address2: '',
    address3: '',
    bio: '',
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [notifications, setNotifications] = useState('All notifications are enabled.');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

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

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountData({ ...accountData, [name]: value });
  };

  

  const saveAccountChanges = async () => {
    const formData = new FormData();
    formData.append('fullName', accountData.fullName);
    formData.append('phoneNumber', accountData.phone);
    formData.append('username', accountData.username);
    formData.append('address', accountData.address1); // Combine address fields if needed
    formData.append('bio', accountData.bio);
  
    if (profileImage) {
      const blob = await fetch(profileImage).then(res => res.blob());
      formData.append('profileImage', blob, 'profile.jpg');
    }
    console.log('hii');
  
    try {
      const response = await fetch('http://localhost:5000/update-profile/consumer', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setPopupMessage('Account details updated successfully');
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          setShowUpdate(false);
        }, 2000);
      
        setUsername(data.user.username);
        
        // Pass updated profile image URL to the parent component
        const updatedProfileImage = `http://localhost:5000${data.user.profileImage}`;
        onProfileUpdate(updatedProfileImage); // Call the callback
        
        if (data.user.profileImage) {
          setProfileImage(updatedProfileImage); // Update local state in ProfileUpdate
        }
      } else {
        setPopupMessage(data.message || 'Failed to update account details');
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
      }
      
    } catch (error) {
      setPopupMessage('An error occurred while updating account details');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  const updatePassword = async () => {
    if (passwordData.newPassword === passwordData.confirmPassword) {
      try {
        const response = await fetch('http://localhost:5000/change-password', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            oldPassword: passwordData.oldPassword,
            newPassword: passwordData.newPassword,
          }),
        });
  
        const data = await response.json();
        if (response.ok) {
          setPopupMessage('Password updated successfully!');
        } else {
          setPopupMessage(data.message || 'Failed to update password');
        }
      } catch (error) {
        setPopupMessage('An error occurred while updating password');
      }
    } else {
      setPopupMessage('Passwords do not match!');
    }
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div>
      {showPopup && <Popup2 message={popupMessage} />}
      <div className="user-profile-container">
        <div className="profile-sidebar">
          <div className="profile-image-wrapper">
            <img
              src={profileImage || assets.profileimg}
              alt="Profile"
              className="profile-image"
              onClick={handleImageClick} 
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange} 
              style={{ display: 'none' }}
              ref={fileInputRef}
            />
          </div>
          <div className="profile-tabs">
            <button onClick={() => setActiveTab('account')} className={activeTab === 'account' ? 'active' : ''}>
              Account
            </button>
            <button onClick={() => setActiveTab('password')} className={activeTab === 'password' ? 'active' : ''}>
              Password
            </button>
            <button onClick={() => setActiveTab('notifications')} className={activeTab === 'notifications' ? 'active' : ''}>
              Notifications
            </button>
          </div>
        </div>
        <div className="profile-content">
          {activeTab === 'account' && (
            <div className="account-tab">
              <h2>Account Information</h2>
              <div className="row">
              <input
                  type="text"
                  name="fullName"
                  value={accountData.fullName}
                  onChange={handleAccountChange}
                  placeholder="Full Name"
                />
              </div>
              <div className='row'>
                <input
                  type="number"
                  name="phone"
                  value={accountData.phone}
                  onChange={handleAccountChange}
                  placeholder="Contact Number"
                />
              </div>
              <div className="row">
                <input
                  type="text"
                  name="username"
                  value={accountData.username}
                  onChange={handleAccountChange}
                  placeholder="Username"
                />
                <input
                  type="text"
                  name="address1"
                  value={accountData.address1}
                  onChange={handleAccountChange}
                  placeholder="Village or Town"
                />
              </div>
              <div className='row'>
                <input
                  type="text"
                  name="address2"
                  value={accountData.address2}
                  onChange={handleAccountChange}
                  placeholder="City"
                />
                <input
                  type="text"
                  name="address3"
                  value={accountData.address3}
                  onChange={handleAccountChange}
                  placeholder="State/Province"
                />
              </div>
              <textarea
                name="bio"
                rows="3"
                value={accountData.bio}
                onChange={handleAccountChange}
                placeholder="Bio">
              </textarea>
              <button onClick={saveAccountChanges}>Save Changes</button>
            </div>
          )}
          {activeTab === 'password' && (
            <div className="password-tab">
              <h2>Update Password</h2>
              <input
                type="password"
                name="oldPassword"
                value={passwordData.oldPassword}
                onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                placeholder="Old Password"
              />
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                placeholder="New Password"
              />
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                placeholder="Confirm Password"
              />
              <button onClick={updatePassword}>Update Password</button>
            </div>
          )}
          {activeTab === 'notifications' && (
            <div className="notifications-tab">
              <h2>Notifications</h2>
              <p>{notifications}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate2;