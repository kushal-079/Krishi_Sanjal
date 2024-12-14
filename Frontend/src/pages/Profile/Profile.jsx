// import React, { useState } from 'react';
// import { assets } from '../../assets/assets';
// import './Profile.css';
// import ProfileUpdate from '../../Components/ProfileUpdate/ProfileUpdate';

// const Profile = () => {
//   const [profileImage, setProfileImage] = useState(null);
//   const [username, setUsername] = useState('Username');
//   const [showUpdate, setShowUpdate] = useState(false);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setProfileImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const logout = () => {
//     console.log("Logged out");
//   };

//   return (
//     <div className={`user-profile-container ${showUpdate ? 'expanded' : ''}`}>
//       {showUpdate ? (
//         <ProfileUpdate username={username} setUsername={setUsername} setShowUpdate={setShowUpdate}
//         handleImageChange={handleImageChange}
//         />
//       ) : (
//         <div className="profile-wrapper">
//           <div className="profile-image-wrapper">
//           <img
//               src={profileImage || assets.profileimg}
//               alt="Profile"
//               className="profile-image"
//             />
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               style={{ display: 'none' }}
//               id="fileInput"
//             />
//           </div>
//           <div className="username">
//             <p>{username}</p>
//           </div>
//           <div className="profile-actions">
//             <button className="btn edit-btn" onClick={() => setShowUpdate(true)}>Update</button>
//             <button className="btn logout-btn" onClick={logout}>Logout</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;


// import React, { useState, useEffect } from 'react';
// import { assets } from '../../assets/assets';
// import './Profile.css';
// import ProfileUpdate from '../../Components/ProfileUpdate/ProfileUpdate';

// const Profile = () => {
//   const [profileData, setProfileData] = useState(null);
//   const [showUpdate, setShowUpdate] = useState(false);

//   // Fetch user profile on component load
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/user-profile', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setProfileData(data);
//         } else {
//           console.error('Failed to fetch profile data');
//         }
//       } catch (error) {
//         console.error('Error fetching profile data:', error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleProfileUpdate = (updatedData) => {
//     setProfileData(updatedData); // Update profile data locally after saving changes
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     window.location.reload();
//   };

//   if (!profileData) {
//     return <p>Loading profile...</p>;
//   }

//   return (
//     <div className={`user-profile-container ${showUpdate ? 'expanded' : ''}`}>
//       {showUpdate ? (
//         <ProfileUpdate
//           username={profileData.username}
//           setUsername={(username) => setProfileData({ ...profileData, username })}
//           setShowUpdate={setShowUpdate}
//           onProfileUpdate={handleProfileUpdate}
//         />
//       ) : (
//         <div className="profile-wrapper">
//           <div className="profile-image-wrapper">
//             <img
//               src={profileData.profileImage || assets.profileimg}
//               alt="Profile"
//               className="profile-image"
//             />
//           </div>
//           <div className="username">
//             <p>{profileData.username}</p>
//           </div>
//           <div className="profile-actions">
//             <button className="btn edit-btn" onClick={() => setShowUpdate(true)}>Update</button>
//             <button className="btn logout-btn" onClick={logout}>Logout</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;


// import React, { useState, useEffect } from 'react';
// import { assets } from '../../assets/assets';
// import './Profile.css';
// import ProfileUpdate from '../../Components/ProfileUpdate/ProfileUpdate';

// const Profile = () => {
//   const [profileImage, setProfileImage] = useState(null);
//   const [username, setUsername] = useState('');
//   const [showUpdate, setShowUpdate] = useState(false);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/profile', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });

//         const data = await response.json();
//         if (response.ok) {
//           setUsername(data.username);
//           if (data.profileImage) {
//             setProfileImage(`http://localhost:5000${data.profileImage}`);
//           }
//         } else {
//           console.error('Failed to fetch profile');
//         }
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   return (
//     <div className={`user-profile-container ${showUpdate ? 'expanded' : ''}`}>
//       {showUpdate ? (
//         <ProfileUpdate
//           username={username}
//           setUsername={setUsername}
//           setShowUpdate={setShowUpdate}
//           handleImageChange={(e) => {
//             const file = e.target.files[0];
//             if (file) {
//               const reader = new FileReader();
//               reader.onload = () => {
//                 setProfileImage(reader.result);
//               };
//               reader.readAsDataURL(file);
//             }
//           }}
//         />
//       ) : (
//         <div className="profile-wrapper">
//           <div className="profile-image-wrapper">
//             <img
//               src={profileImage || assets.profileimg}
//               alt="Profile"
//               className="profile-image"
//             />
//           </div>
//           <div className="username">
//             <p>{username}</p>
//           </div>
//           <div className="profile-actions">
//             <button className="btn edit-btn" onClick={() => setShowUpdate(true)}>Update</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;


import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import './Profile.css';
import ProfileUpdate from '../../Components/ProfileUpdate/ProfileUpdate';

const Profile = () => {
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
        <ProfileUpdate
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

export default Profile;
