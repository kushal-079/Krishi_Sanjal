// // import React, { useState, useRef } from 'react';
// // import { assets } from '../../assets/assets';
// // import './ProfileUpdate.css';
// // import Popup from '../Popup/Popup';


// // const ProfileUpdate = ({ username, setUsername, setShowUpdate }) => {
// //   const [profileImage, setProfileImage] = useState(null);
// //   const fileInputRef = useRef(null);
// //   const [activeTab, setActiveTab] = useState('account');
// //   const [accountData, setAccountData] = useState({
// //     Firstname: '',
// //     Lastname: '',
// //     email: '',
// //     phone: '',
// //     username: username,
// //     address1: '',
// //     address2: '',
// //     address3: '',
// //     Farmname: '',
// //     Farmaddress: '',
// //     bio: '',
// //   });
// //   const [passwordData, setPasswordData] = useState({
// //     oldPassword: '',
// //     newPassword: '',
// //     confirmPassword: '',
// //   });
// //   const [notifications, setNotifications] = useState('All notifications are enabled.');
// //   const [showPopup, setShowPopup] = useState(false);
// //   const [popupMessage, setPopupMessage] = useState('');

// //   const handleImageClick = () => {
// //     fileInputRef.current.click();
// //   };

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onload = () => {
// //         setProfileImage(reader.result);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handleAccountChange = (e) => {
// //     const { name, value } = e.target;
// //     setAccountData({ ...accountData, [name]: value });
// //   };

// //   const handlePasswordChange = (e) => {
// //     const { name, value } = e.target;
// //     setPasswordData({ ...passwordData, [name]: value });
// //   };

// //   // const saveAccountChanges = () => {
    
// //   //   setPopupMessage('Account details updated successfully');
// //   //   setShowPopup(true);
// //   //   setTimeout(() => {
// //   //     setShowPopup(false);
// //   //   }, 2000);

// //   //   setUsername(accountData.username);
// //   // };

// //   // const updatePassword = () => {
// //   //   if (passwordData.newPassword === passwordData.confirmPassword) {
// //   //     setPopupMessage('Password updated successfully!');
// //   //     setShowPopup(true);
// //   //     setTimeout(() => {
// //   //       setShowPopup(false);
// //   //     }, 2000);
// //   //   } else {
// //   //     setPopupMessage('Passwords do not match!');
// //   //     setShowPopup(true);
// //   //     setTimeout(() => {
// //   //       setShowPopup(false);
// //   //     }, 2000);
// //   //   }
// //   // };

// //   const saveAccountChanges = async () => {
// //     try {
// //       const response = await fetch('http://localhost:5000/profile', {
// //         method: 'PUT',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           userId: 'USER_ID', // Replace with the logged-in user's ID
// //           updatedData: accountData,
// //         }),
// //       });
  
// //       if (response.ok) {
// //         const data = await response.json();
// //         setPopupMessage('Account details updated successfully');
// //         setShowPopup(true);
// //         setTimeout(() => {
// //           setShowPopup(false);
// //         }, 2000);
  
// //         setUsername(data.user.username); // Update the displayed username
// //       } else {
// //         const error = await response.json();
// //         setPopupMessage(error.message || 'Failed to update account');
// //         setShowPopup(true);
// //       }
// //     } catch (err) {
// //       setPopupMessage('Error updating profile');
// //       setShowPopup(true);
// //     }
// //   };
  
// //   const updatePassword = async () => {
// //     if (passwordData.newPassword !== passwordData.confirmPassword) {
// //       setPopupMessage('Passwords do not match!');
// //       setShowPopup(true);
// //       return;
// //     }
  
// //     try {
// //       const response = await fetch('http://localhost:5000/profile/password', {
// //         method: 'PUT',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           userId: 'USER_ID', // Replace with the logged-in user's ID
// //           oldPassword: passwordData.oldPassword,
// //           newPassword: passwordData.newPassword,
// //         }),
// //       });
  
// //       if (response.ok) {
// //         setPopupMessage('Password updated successfully!');
// //         setShowPopup(true);
// //         setTimeout(() => {
// //           setShowPopup(false);
// //         }, 2000);
// //       } else {
// //         const error = await response.json();
// //         setPopupMessage(error.message || 'Failed to update password');
// //         setShowPopup(true);
// //       }
// //     } catch (err) {
// //       setPopupMessage('Error updating password');
// //       setShowPopup(true);
// //     }
// //   };
  

// //   return (
// //     <div>
// //       {showPopup && <Popup message={popupMessage} />}
// //       <div className="user-profile-container">
// //         <div className="profile-sidebar">
// //           <div className="profile-image-wrapper">
// //             <img
// //               src={profileImage || assets.profileimg}
// //               alt="Profile"
// //               className="profile-image"
// //               onClick={handleImageClick} 
// //             />
// //             <input
// //               type="file"
// //               accept="image/*"
// //               onChange={handleImageChange} 
// //               style={{ display: 'none' }}
// //               ref={fileInputRef}
// //             />
// //           </div>
// //           <div className="profile-tabs">
// //             <button onClick={() => setActiveTab('account')} className={activeTab === 'account' ? 'active' : ''}>
// //               Account
// //             </button>
// //             <button onClick={() => setActiveTab('password')} className={activeTab === 'password' ? 'active' : ''}>
// //               Password
// //             </button>
// //             <button onClick={() => setActiveTab('notifications')} className={activeTab === 'notifications' ? 'active' : ''}>
// //               Notifications
// //             </button>
// //           </div>
// //         </div>
// //         <div className="profile-content">
// //           {activeTab === 'account' && (
// //             <div className="account-tab">
// //               <h2>Account Information</h2>
// //               <div className="row">
// //                 <input
// //                   type="text"
// //                   name="Firstname"
// //                   value={accountData.Firstname}
// //                   onChange={handleAccountChange}
// //                   placeholder="First Name"
// //                 />
// //                 <input
// //                   type="text"
// //                   name="Lastname"
// //                   value={accountData.Lastname}
// //                   onChange={handleAccountChange}
// //                   placeholder="Last Name"
// //                 />
// //               </div>
// //               <div className='row'>
// //                 <input
// //                   type="email"
// //                   name="email"
// //                   value={accountData.email}
// //                   onChange={handleAccountChange}
// //                   placeholder="Email"
// //                 />
// //                 <input
// //                   type="text"
// //                   name="phone"
// //                   value={accountData.phone}
// //                   onChange={handleAccountChange}
// //                   placeholder="Phone Number"
// //                 />
// //               </div>
// //               <div className="row">
// //                 <input
// //                   type="text"
// //                   name="username"
// //                   value={accountData.username}
// //                   onChange={handleAccountChange}
// //                   placeholder="Username"
// //                 />
// //                 <input
// //                   type="text"
// //                   name="address1"
// //                   value={accountData.address1}
// //                   onChange={handleAccountChange}
// //                   placeholder="Village or Town"
// //                 />
// //               </div>
// //               <div className='row'>
// //                 <input
// //                   type="text"
// //                   name="address2"
// //                   value={accountData.address2}
// //                   onChange={handleAccountChange}
// //                   placeholder="City"
// //                 />
// //                 <input
// //                   type="text"
// //                   name="address3"
// //                   value={accountData.address3}
// //                   onChange={handleAccountChange}
// //                   placeholder="State/Province"
// //                 />
// //               </div>
// //               <div className='row'>
// //                 <input
// //                   type="text"
// //                   name="Farmname"
// //                   value={accountData.Farmname}
// //                   onChange={handleAccountChange}
// //                   placeholder="Farm Name"
// //                 />
// //                 <input
// //                   type="text"
// //                   name="Farmaddress"
// //                   value={accountData.Farmaddress}
// //                   onChange={handleAccountChange}
// //                   placeholder="Farm Address"
// //                 />
// //               </div>
// //               <textarea
// //                 name="bio"
// //                 rows="3"
// //                 value={accountData.bio}
// //                 onChange={handleAccountChange}
// //                 placeholder="Bio">
// //               </textarea>
// //               <button onClick={saveAccountChanges}>Save Changes</button>
// //             </div>
// //           )}
// //           {activeTab === 'password' && (
// //             <div className="password-tab">
// //               <h2>Update Password</h2>
// //               <input
// //                 type="password"
// //                 name="oldPassword"
// //                 value={passwordData.oldPassword}
// //                 onChange={handlePasswordChange}
// //                 placeholder="Old Password"
// //               />
// //               <input
// //                 type="password"
// //                 name="newPassword"
// //                 value={passwordData.newPassword}
// //                 onChange={handlePasswordChange}
// //                 placeholder="New Password"
// //               />
// //               <input
// //                 type="password"
// //                 name="confirmPassword"
// //                 value={passwordData.confirmPassword}
// //                 onChange={handlePasswordChange}
// //                 placeholder="Confirm Password"
// //               />
// //               <button onClick={updatePassword}>Update Password</button>
// //             </div>
// //           )}
// //           {activeTab === 'notifications' && (
// //             <div className="notifications-tab">
// //               <h2>Notifications</h2>
// //               <p>{notifications}</p>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProfileUpdate;


// import React, { useState, useRef } from 'react';
// import { assets } from '../../assets/assets';
// import './ProfileUpdate.css';
// import Popup from '../Popup/Popup';

// const ProfileUpdate = ({ username, setUsername, setShowUpdate }) => {
//   const [profileImage, setProfileImage] = useState(null);
//   const fileInputRef = useRef(null);
//   const [activeTab, setActiveTab] = useState('account');
//   const [accountData, setAccountData] = useState({
//     Firstname: '',
//     Lastname: '',
//     email: '',
//     phone: '',
//     username: username,
//     address1: '',
//     address2: '',
//     address3: '',
//     Farmname: '',
//     Farmaddress: '',
//     bio: '',
//   });
//   const [passwordData, setPasswordData] = useState({
//     oldPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupMessage, setPopupMessage] = useState('');

//   const handleImageClick = () => {
//     fileInputRef.current.click();
//   };

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

//   const handleAccountChange = (e) => {
//     const { name, value } = e.target;
//     setAccountData({ ...accountData, [name]: value });
//   };

//   const handlePasswordChange = (e) => {
//     const { name, value } = e.target;
//     setPasswordData({ ...passwordData, [name]: value });
//   };

//   const saveAccountChanges = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/update-profile', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify(accountData),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         setPopupMessage('Account details updated successfully');
//         setUsername(accountData.username);
//       } else {
//         setPopupMessage(result.message || 'Failed to update profile.');
//       }
//     } catch (error) {
//       setPopupMessage('Error while updating profile.');
//     } finally {
//       setShowPopup(true);
//       setTimeout(() => setShowPopup(false), 2000);
//     }
//   };

//   const updatePassword = async () => {
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       setPopupMessage('Passwords do not match!');
//       setShowPopup(true);
//       setTimeout(() => setShowPopup(false), 2000);
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:5000/change-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify(passwordData),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         setPopupMessage('Password updated successfully!');
//       } else {
//         setPopupMessage(result.message || 'Failed to update password.');
//       }
//     } catch (error) {
//       setPopupMessage('Error while updating password.');
//     } finally {
//       setShowPopup(true);
//       setTimeout(() => setShowPopup(false), 2000);
//     }
//   };

//   return (
//     <div>
//       {showPopup && <Popup message={popupMessage} />}
//       <div className="user-profile-container">
//         <div className="profile-sidebar">
//           <div className="profile-image-wrapper">
//             <img
//               src={profileImage || assets.profileimg}
//               alt="Profile"
//               className="profile-image"
//               onClick={handleImageClick}
//             />
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               style={{ display: 'none' }}
//               ref={fileInputRef}
//             />
//           </div>
//           <div className="profile-tabs">
//             <button onClick={() => setActiveTab('account')} className={activeTab === 'account' ? 'active' : ''}>
//               Account
//             </button>
//             <button onClick={() => setActiveTab('password')} className={activeTab === 'password' ? 'active' : ''}>
//               Password
//             </button>
//           </div>
//         </div>
//         <div className="profile-content">
//           {activeTab === 'account' && (
//             <div className="account-tab">
//               <h2>Account Information</h2>
//               <input type="text" name="Firstname" value={accountData.Firstname} onChange={handleAccountChange} placeholder="First Name" />
//               <input type="text" name="Lastname" value={accountData.Lastname} onChange={handleAccountChange} placeholder="Last Name" />
//               <input type="email" name="email" value={accountData.email} onChange={handleAccountChange} placeholder="Email" />
//               <input type="text" name="username" value={accountData.username} onChange={handleAccountChange} placeholder="Username" />
//               <button onClick={saveAccountChanges}>Save Changes</button>
//             </div>
//           )}
//           {activeTab === 'password' && (
//             <div className="password-tab">
//               <h2>Update Password</h2>
//               <input type="password" name="oldPassword" value={passwordData.oldPassword} onChange={handlePasswordChange} placeholder="Old Password" />
//               <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} placeholder="New Password" />
//               <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} placeholder="Confirm Password" />
//               <button onClick={updatePassword}>Update Password</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileUpdate;


import React, { useState, useRef } from 'react';
import { assets } from '../../assets/assets';
import './ProfileUpdate.css';
import Popup from '../Popup/Popup';

// const ProfileUpdate = ({ username, setUsername, setShowUpdate }) => {
//   const [profileImage, setProfileImage] = useState(null);
//   const fileInputRef = useRef(null);
//   const [activeTab, setActiveTab] = useState('account');
//   const [accountData, setAccountData] = useState({
//     fullName: '',
//     phone: '',
//     username: '',
//     address1: '',
//     address2: '',
//     address3: '',
//     Farmname: '',
//     Farmaddress: '',
//     bio: '',
//   });
//   const [passwordData, setPasswordData] = useState({
//     oldPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });
//   const [notifications, setNotifications] = useState('All notifications are enabled.');
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupMessage, setPopupMessage] = useState('');

//   const handleImageClick = () => {
//     fileInputRef.current.click();
//   };

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

//   const handleAccountChange = (e) => {
//     const { name, value } = e.target;
//     setAccountData({ ...accountData, [name]: value });
//   };

//   const saveAccountChanges = async () => {

//     const updateData = {
//       fullName: accountData.fullName,
//       phoneNumber: accountData.phone,
//       username: accountData.username,
//       address: accountData.address1, // Combine address fields if needed
//       shopName: accountData.Farmname, // Correctly map Farmname to shopName
//       bio: accountData.bio,
//     };
//     try {
//       const response = await fetch('http://localhost:5000/update-profile', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify(updateData),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setPopupMessage('Account details updated successfully');
//         setShowPopup(true);
//         setTimeout(() => {
//           setShowPopup(false);
//           setShowUpdate(false);
//         }, 2000);
//         setUsername(updateData.username);
//       } else {
//         setPopupMessage(data.message || 'Failed to update account details');
//         setShowPopup(true);
//         setTimeout(() => setShowPopup(false), 2000);
//       }
//     } catch (error) {
//       setPopupMessage('An error occurred while updating account details');
//       setShowPopup(true);
//       setTimeout(() => setShowPopup(false), 2000);
//     }
//   };

//   const updatePassword = async () => {
//     if (passwordData.newPassword === passwordData.confirmPassword) {
//       try {
//         const response = await fetch('http://localhost:5000/update-password', {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//           body: JSON.stringify(passwordData),
//         });

//         const data = await response.json();
//         if (response.ok) {
//           setPopupMessage('Password updated successfully!');
//         } else {
//           setPopupMessage(data.message || 'Failed to update password');
//         }
//       } catch (error) {
//         setPopupMessage('An error occurred while updating password');
//       }
//     } else {
//       setPopupMessage('Passwords do not match!');
//     }
//     setShowPopup(true);
//     setTimeout(() => setShowPopup(false), 2000);
//   };

//   return (
//     <div>
//       {showPopup && <Popup message={popupMessage} />}
//       <div className="user-profile-container">
//         <div className="profile-sidebar">
//           <div className="profile-image-wrapper">
//             <img
//               src={profileImage || assets.profileimg}
//               alt="Profile"
//               className="profile-image"
//               onClick={handleImageClick}
//             />
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               style={{ display: 'none' }}
//               ref={fileInputRef}
//             />
//           </div>
//           <div className="profile-tabs">
//             <button onClick={() => setActiveTab('account')} className={activeTab === 'account' ? 'active' : ''}>
//               Account
//             </button>
//             <button onClick={() => setActiveTab('password')} className={activeTab === 'password' ? 'active' : ''}>
//               Password
//             </button>
//             <button onClick={() => setActiveTab('notifications')} className={activeTab === 'notifications' ? 'active' : ''}>
//               Notifications
//             </button>
//           </div>
//         </div>
//         <div className="profile-content">
//           {activeTab === 'account' && (
//             <div className="account-tab">
//               <h2>Account Information</h2>
//               <div className="row">
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={accountData.fullName}
//                   onChange={handleAccountChange}
//                   placeholder="Full Name"
//                 />
//               </div>
//               <div className="row">
//                 <input
//                   type="text"
//                   name="phone"
//                   value={accountData.phone}
//                   onChange={handleAccountChange}
//                   placeholder="Phone Number"
//                 />
//                 <input
//                   type="text"
//                   name="username"
//                   value={accountData.username}
//                   onChange={handleAccountChange}
//                   placeholder="Username"
//                 />
//               </div>
//               <div className="row">
//                 <input
//                   type="text"
//                   name="address1"
//                   value={accountData.address1}
//                   onChange={handleAccountChange}
//                   placeholder="Village or Town"
//                 />
//                 <input
//                   type="text"
//                   name="address2"
//                   value={accountData.address2}
//                   onChange={handleAccountChange}
//                   placeholder="City"
//                 />
//               </div>
//               <div className="row">
//                 <input
//                   type="text"
//                   name="address3"
//                   value={accountData.address3}
//                   onChange={handleAccountChange}
//                   placeholder="State/Province"
//                 />
//                 <input
//                   type="text"
//                   name="Farmname"
//                   value={accountData.Farmname}
//                   onChange={handleAccountChange}
//                   placeholder="Farm Name"
//                 />
//               </div>
//               <textarea
//                 name="bio"
//                 rows="3"
//                 value={accountData.bio}
//                 onChange={handleAccountChange}
//                 placeholder="Bio"
//               ></textarea>
//               <button onClick={saveAccountChanges}>Save Changes</button>
//             </div>
//           )}
//           {activeTab === 'password' && (
//             <div className="password-tab">
//               <h2>Update Password</h2>
//               <input
//                 type="password"
//                 name="oldPassword"
//                 value={passwordData.oldPassword}
//                 onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
//                 placeholder="Old Password"
//               />
//               <input
//                 type="password"
//                 name="newPassword"
//                 value={passwordData.newPassword}
//                 onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
//                 placeholder="New Password"
//               />
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={passwordData.confirmPassword}
//                 onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
//                 placeholder="Confirm Password"
//               />
//               <button onClick={updatePassword}>Update Password</button>
//             </div>
//           )}
//           {activeTab === 'notifications' && (
//             <div className="notifications-tab">
//               <h2>Notifications</h2>
//               <p>{notifications}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileUpdate;


const ProfileUpdate = ({ username, setUsername, setShowUpdate, onProfileUpdate }) => {
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
    Farmname: '',
    Farmaddress: '',
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

// const saveAccountChanges = async () => {
//     const formData = new FormData();
//     formData.append('fullName', accountData.fullName);
//     formData.append('phoneNumber', accountData.phone);
//     formData.append('username', accountData.username);
//     formData.append('address', accountData.address1); // Combine address fields if needed
//     formData.append('shopName', accountData.Farmname); // Correctly map Farmname to shopName
//     formData.append('bio', accountData.bio);
  
//     if (profileImage) {
//       const blob = await fetch(profileImage).then(res => res.blob());
//       formData.append('profileImage', blob, 'profile.jpg');
//     }
  
//     try {
//       const response = await fetch('http://localhost:5000/update-profile/farmer', {
//         method: 'PUT',
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: formData,
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setPopupMessage('Account details updated successfully');
//         setShowPopup(true);
//         setTimeout(() => {
//           setShowPopup(false);
//           setShowUpdate(false);
//         }, 2000);
      
//         setUsername(data.user.username);
        
//         // Pass updated profile image URL to the parent component
//         const updatedProfileImage = `http://localhost:5000${data.user.profileImage}`;
//         onProfileUpdate(updatedProfileImage); // Call the callback
        
//         if (data.user.profileImage) {
//           setProfileImage(updatedProfileImage); // Update local state in ProfileUpdate
//         }
//       } else {
//         setPopupMessage(data.message || 'Failed to update account details');
//         setShowPopup(true);
//         setTimeout(() => setShowPopup(false), 2000);
//       }
      
//     } catch (error) {
//       setPopupMessage('An error occurred while updating account details');
//       setShowPopup(true);
//       setTimeout(() => setShowPopup(false), 2000);
//     }
//   };


const saveAccountChanges = async () => {
  const filteredData = {};
  Object.keys(accountData).forEach((key) => {
    if (accountData[key]?.trim()) {
      filteredData[key] = accountData[key];
    }
  });

  const formData = new FormData();
  Object.entries(filteredData).forEach(([key, value]) => {
    formData.append(key, value);
  });

  if (profileImage) {
    const blob = await fetch(profileImage).then(res => res.blob());
    formData.append('profileImage', blob, 'profile.jpg');
  }

  try {
    const response = await fetch('http://localhost:5000/update-profile/farmer', {
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
      if (data.user.profileImage) {
        setProfileImage(`http://localhost:5000${data.user.profileImage}`);
        onProfileUpdate(`http://localhost:5000${data.user.profileImage}`);
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

// const updatePassword = async () => {
//     if (passwordData.newPassword === passwordData.confirmPassword) {
//       try {
//         const response = await fetch('http://localhost:5000/change-password', {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//           body: JSON.stringify({
//             oldPassword: passwordData.oldPassword,
//             newPassword: passwordData.newPassword,
//           }),
//         });
  
//         const data = await response.json();
//         if (response.ok) {
//           setPopupMessage('Password updated successfully!');
//         } else {
//           setPopupMessage(data.message || 'Failed to update password');
//         }
//       } catch (error) {
//         setPopupMessage('An error occurred while updating password');
//       }
//     } else {
//       setPopupMessage('Passwords do not match!');
//     }
//     setShowPopup(true);
//     setTimeout(() => setShowPopup(false), 2000);
//   };
  
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
      {showPopup && <Popup message={popupMessage} />}
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
              <div className="row">
                <input
                  type="number"
                  name="phone"
                  value={accountData.phone}
                  onChange={handleAccountChange}
                  placeholder="Phone Number"
                />
                <input
                  type="text"
                  name="username"
                  value={accountData.username}
                  onChange={handleAccountChange}
                  placeholder="Username"
                />
              </div>
              <div className="row">
                <input
                  type="text"
                  name="address1"
                  value={accountData.address1}
                  onChange={handleAccountChange}
                  placeholder="Village or Town"
                />
                <input
                  type="text"
                  name="address2"
                  value={accountData.address2}
                  onChange={handleAccountChange}
                  placeholder="City"
                />
              </div>
              <div className="row">
                <input
                  type="text"
                  name="address3"
                  value={accountData.address3}
                  onChange={handleAccountChange}
                  placeholder="State/Province"
                />
                <input
                  type="text"
                  name="Farmname"
                  value={accountData.Farmname}
                  onChange={handleAccountChange}
                  placeholder="Farm Name"
                />
              </div>
              <textarea
                name="bio"
                rows="3"
                value={accountData.bio}
                onChange={handleAccountChange}
                placeholder="Bio"
              ></textarea>
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

export default ProfileUpdate;

