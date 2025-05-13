// // src/App.js
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AdminPanel from "./AdminPanel";
// import MeetingRoot from "./MeetingRoot";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/admin" element={<AdminPanel />} />
//         <Route path="/*" element={<MeetingRoot />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AdminPanel from "./AdminPanel"; // Твой кастомный компонент
// import HomePage from "./HomePage"; // Или та страница, куда ты хочешь перенаправлять по умолчанию

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/admin" element={<AdminPanel />} />
//         <Route path="/*" element={<HomePage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Admin, Resource, ListGuesser } from "react-admin";
// import simpleRestProvider from "ra-data-simple-rest";
// import { MeetingProvider } from "@videosdk.live/react-sdk";
// import { MeetingAppProvider } from "./MeetingAppContextDef";
// import { MeetingContainer } from "./meeting/MeetingContainer";
// import { LeaveScreen } from "./components/screens/LeaveScreen";
// import { JoiningScreen } from "./components/screens/JoiningScreen";

// const dataProvider = simpleRestProvider("http://localhost:5001");

// const AdminPanel = () => (
//   <Admin dataProvider={dataProvider}>
//     <Resource name="users" list={ListGuesser} />
//   </Admin>
// );

// function MainMeetingApp() {
//   const [token, setToken] = React.useState("");
//   const [meetingId, setMeetingId] = React.useState("");
//   const [participantName, setParticipantName] = React.useState("");
//   const [micOn, setMicOn] = React.useState(false);
//   const [webcamOn, setWebcamOn] = React.useState(false);
//   const [customAudioStream, setCustomAudioStream] = React.useState(null);
//   const [customVideoStream, setCustomVideoStream] = React.useState(null);
//   const [isMeetingStarted, setMeetingStarted] = React.useState(false);
//   const [isMeetingLeft, setIsMeetingLeft] = React.useState(false);

//   return (
//     <MeetingAppProvider>
//       {isMeetingStarted ? (
//         <MeetingProvider
//           config={{
//             meetingId,
//             micEnabled: micOn,
//             webcamEnabled: webcamOn,
//             name: participantName || "TestUser",
//             multiStream: true,
//             customCameraVideoTrack: customVideoStream,
//             customMicrophoneAudioTrack: customAudioStream,
//           }}
//           token={token}
//           reinitialiseMeetingOnConfigChange={true}
//           joinWithoutUserInteraction={true}
//         >
//           <MeetingContainer
//             onMeetingLeave={() => {
//               setToken("");
//               setMeetingId("");
//               setParticipantName("");
//               setWebcamOn(false);
//               setMicOn(false);
//               setMeetingStarted(false);
//             }}
//             setIsMeetingLeft={setIsMeetingLeft}
//           />
//         </MeetingProvider>
//       ) : isMeetingLeft ? (
//         <LeaveScreen setIsMeetingLeft={setIsMeetingLeft} />
//       ) : (
//         <JoiningScreen
//           participantName={participantName}
//           setParticipantName={setParticipantName}
//           setMeetingId={setMeetingId}
//           setToken={setToken}
//           micOn={micOn}
//           setMicOn={setMicOn}
//           webcamOn={webcamOn}
//           setWebcamOn={setWebcamOn}
//           customAudioStream={customAudioStream}
//           setCustomAudioStream={setCustomAudioStream}
//           customVideoStream={customVideoStream}
//           setCustomVideoStream={setCustomVideoStream}
//           onClickStartMeeting={() => {
//             setMeetingStarted(true);
//           }}
//           startMeeting={isMeetingStarted}
//           setIsMeetingLeft={setIsMeetingLeft}
//         />
//       )}
//     </MeetingAppProvider>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<MainMeetingApp />} />
//         <Route path="/admin/*" element={<AdminPanel />} />
//       </Routes>
//     </Router>
//   );
// }





// 

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Admin, Resource, ListGuesser } from 'react-admin';
// import { List, Datagrid, TextField } from 'react-admin';
// import simpleRestProvider from 'ra-data-simple-rest';
// import { MeetingProvider } from "@videosdk.live/react-sdk";
// import { MeetingAppProvider } from "./MeetingAppContextDef";
// import { MeetingContainer } from "./meeting/MeetingContainer";
// import { LeaveScreen } from "./components/screens/LeaveScreen";
// import { JoiningScreen } from "./components/screens/JoiningScreen";

// // Админка: провайдер данных
// const dataProvider = simpleRestProvider('http://localhost:5001');

// // Компонент списка пользователей для админки
// const UserList = () => (
//   <List>
//     <Datagrid>
//       <TextField source="id" />
//       <TextField source="name" />
//       <TextField source="email" />
//     </Datagrid>
//   </List>
// );

// function App() {
//   const [token, setToken] = useState("");
//   const [meetingId, setMeetingId] = useState("");
//   const [participantName, setParticipantName] = useState("");
//   const [micOn, setMicOn] = useState(false);
//   const [webcamOn, setWebcamOn] = useState(false);
//   const [customAudioStream, setCustomAudioStream] = useState(null);
//   const [customVideoStream, setCustomVideoStream] = useState(null);
//   const [isMeetingStarted, setMeetingStarted] = useState(false);
//   const [isMeetingLeft, setIsMeetingLeft] = useState(false);

//   const isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;

//   useEffect(() => {
//     if (isMobile) {
//       window.onbeforeunload = () => {
//         return "Are you sure you want to exit?";
//       };
//     }
//   }, [isMobile]);

//   return (
//     <Router>
//       <Routes>

//         {/* Главная страница */}
//         <Route
//           path="/"
//           element={
//             <div style={{ padding: "2rem" }}>
//               <h1>Welcome to the app!</h1>
//               <p>
//                 Go to <a href="/admin">Admin Panel</a> or <a href="/video">Video Meeting</a>
//               </p>
//             </div>
//           }
//         />

//         {/* Админка */}
//         <Route
//           path="/admin"
//           element={
//             <Admin dataProvider={dataProvider}>
//               <Resource name="users" list={UserList} />
//             </Admin>
//           }
//         />

//         {/* Видео-звонок */}
//         <Route
//           path="/video"
//           element={
//             <MeetingAppProvider>
//               {isMeetingStarted ? (
//                 <MeetingProvider
//                   config={{
//                     meetingId,
//                     micEnabled: micOn,
//                     webcamEnabled: webcamOn,
//                     name: participantName ? participantName : "TestUser",
//                     multiStream: true,
//                     customCameraVideoTrack: customVideoStream,
//                     customMicrophoneAudioTrack: customAudioStream,
//                   }}
//                   token={token}
//                   reinitialiseMeetingOnConfigChange={true}
//                   joinWithoutUserInteraction={true}
//                 >
//                   <MeetingContainer
//                     onMeetingLeave={() => {
//                       setToken("");
//                       setMeetingId("");
//                       setParticipantName("");
//                       setWebcamOn(false);
//                       setMicOn(false);
//                       setMeetingStarted(false);
//                     }}
//                     setIsMeetingLeft={setIsMeetingLeft}
//                   />
//                 </MeetingProvider>
//               ) : isMeetingLeft ? (
//                 <LeaveScreen setIsMeetingLeft={setIsMeetingLeft} />
//               ) : (
//                 <JoiningScreen
//                   participantName={participantName}
//                   setParticipantName={setParticipantName}
//                   setMeetingId={setMeetingId}
//                   setToken={setToken}
//                   micOn={micOn}
//                   setMicOn={setMicOn}
//                   webcamOn={webcamOn}
//                   setWebcamOn={setWebcamOn}
//                   customAudioStream={customAudioStream}
//                   setCustomAudioStream={setCustomAudioStream}
//                   customVideoStream={customVideoStream}
//                   setCustomVideoStream={setCustomVideoStream}
//                   onClickStartMeeting={() => {
//                     setMeetingStarted(true);
//                   }}
//                   startMeeting={isMeetingStarted}
//                   setIsMeetingLeft={setIsMeetingLeft}
//                 />
//               )}
//             </MeetingAppProvider>
//           }
//         />

//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Admin, Resource, ListGuesser } from 'react-admin';
// import { List, Datagrid, TextField } from 'react-admin';
// import simpleRestProvider from 'ra-data-simple-rest';
// import { MeetingProvider } from "@videosdk.live/react-sdk";
// import { MeetingAppProvider } from "./MeetingAppContextDef";
// import { MeetingContainer } from "./meeting/MeetingContainer";
// import { LeaveScreen } from "./components/screens/LeaveScreen";
// import { JoiningScreen } from "./components/screens/JoiningScreen";

// import { GoogleLogin } from "@react-oauth/google";
// import jwt_decode from "jwt-decode";

// // Админка: провайдер данных
// const dataProvider = simpleRestProvider('http://localhost:5001');

// // Компонент списка пользователей для админки
// const UserList = () => (
//   <List>
//     <Datagrid>
//       <TextField source="id" />
//       <TextField source="name" />
//       <TextField source="email" />
//     </Datagrid>
//   </List>
// );

// function App() {
//   const [token, setToken] = useState("");
//   const [meetingId, setMeetingId] = useState("");
//   const [participantName, setParticipantName] = useState("");
//   const [micOn, setMicOn] = useState(false);
//   const [webcamOn, setWebcamOn] = useState(false);
//   const [customAudioStream, setCustomAudioStream] = useState(null);
//   const [customVideoStream, setCustomVideoStream] = useState(null);
//   const [isMeetingStarted, setMeetingStarted] = useState(false);
//   const [isMeetingLeft, setIsMeetingLeft] = useState(false);

//   const [user, setUser] = useState(() => {
//     const saved = localStorage.getItem("user");
//     return saved ? JSON.parse(saved) : null;
//   });

//   const isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;

//   useEffect(() => {
//     if (isMobile) {
//       window.onbeforeunload = () => {
//         return "Are you sure you want to exit?";
//       };
//     }
//   }, [isMobile]);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <Router>
//       <Routes>

//         {/* Главная страница */}
//         <Route
//           path="/"
//           element={
//             <div style={{ padding: "2rem" }}>
//               <h1>Welcome to the app!</h1>
//               <p>
//                 Go to <a href="/admin">Admin Panel</a> or <a href="/video">Video Meeting</a>
//               </p>

//               {!user ? (
//                 <div style={{ marginTop: "2rem" }}>
//                   <GoogleLogin
//                     onSuccess={(credentialResponse) => {
//                       const decoded = jwt_decode(credentialResponse.credential);
//                       setUser(decoded);
//                       localStorage.setItem("user", JSON.stringify(decoded));
//                     }}
//                     onError={() => {
//                       console.log("Login Failed");
//                     }}
//                   />
//                 </div>
//               ) : (
//                 <div style={{ marginTop: "2rem" }}>
//                   <p>👋 Hello, {user.name}!</p>
//                   <button onClick={handleLogout}>Logout</button>
//                 </div>
//               )}
//             </div>
//           }
//         />

//         {/* Админка — доступ только при входе */}
//         <Route
//           path="/admin"
//           element={
//             user ? (
//               <Admin dataProvider={dataProvider}>
//                 <Resource name="users" list={UserList} />
//               </Admin>
//             ) : (
//               <div style={{ padding: "2rem" }}>
//                 <h2>⚠️ Please log in to access the Admin Panel</h2>
//                 <GoogleLogin
//                   onSuccess={(credentialResponse) => {
//                     const decoded = jwt_decode(credentialResponse.credential);
//                     setUser(decoded);
//                     localStorage.setItem("user", JSON.stringify(decoded));
//                   }}
//                   onError={() => {
//                     console.log("Login Failed");
//                   }}
//                 />
//               </div>
//             )
//           }
//         />

//         {/* Видео-звонок */}
//         <Route
//           path="/video"
//           element={
//             <MeetingAppProvider>
//               {isMeetingStarted ? (
//                 <MeetingProvider
//                   config={{
//                     meetingId,
//                     micEnabled: micOn,
//                     webcamEnabled: webcamOn,
//                     name: participantName ? participantName : "TestUser",
//                     multiStream: true,
//                     customCameraVideoTrack: customVideoStream,
//                     customMicrophoneAudioTrack: customAudioStream,
//                   }}
//                   token={token}
//                   reinitialiseMeetingOnConfigChange={true}
//                   joinWithoutUserInteraction={true}
//                 >
//                   <MeetingContainer
//                     onMeetingLeave={() => {
//                       setToken("");
//                       setMeetingId("");
//                       setParticipantName("");
//                       setWebcamOn(false);
//                       setMicOn(false);
//                       setMeetingStarted(false);
//                     }}
//                     setIsMeetingLeft={setIsMeetingLeft}
//                   />
//                 </MeetingProvider>
//               ) : isMeetingLeft ? (
//                 <LeaveScreen setIsMeetingLeft={setIsMeetingLeft} />
//               ) : (
//                 <JoiningScreen
//                   participantName={participantName}
//                   setParticipantName={setParticipantName}
//                   setMeetingId={setMeetingId}
//                   setToken={setToken}
//                   micOn={micOn}
//                   setMicOn={setMicOn}
//                   webcamOn={webcamOn}
//                   setWebcamOn={setWebcamOn}
//                   customAudioStream={customAudioStream}
//                   setCustomAudioStream={setCustomAudioStream}
//                   customVideoStream={customVideoStream}
//                   setCustomVideoStream={setCustomVideoStream}
//                   onClickStartMeeting={() => {
//                     setMeetingStarted(true);
//                   }}
//                   startMeeting={isMeetingStarted}
//                   setIsMeetingLeft={setIsMeetingLeft}
//                 />
//               )}
//             </MeetingAppProvider>
//           }
//         />

//       </Routes>
//     </Router>
//   );
// }

// export default App;


// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Admin, Resource, ListGuesser } from 'react-admin';
// import { List, Datagrid, TextField } from 'react-admin';
// import simpleRestProvider from 'ra-data-simple-rest';
// import { MeetingProvider } from "@videosdk.live/react-sdk";
// import { MeetingAppProvider } from "./MeetingAppContextDef";
// import { MeetingContainer } from "./meeting/MeetingContainer";
// import { LeaveScreen } from "./components/screens/LeaveScreen";
// import { JoiningScreen } from "./components/screens/JoiningScreen";

// import { GoogleLogin } from "@react-oauth/google";
// import jwt_decode from "jwt-decode";

// // Админка: провайдер данных
// const dataProvider = simpleRestProvider('http://localhost:5001');

// // Компонент списка пользователей для админки
// const UserList = () => (
//   <List>
//     <Datagrid>
//       <TextField source="id" />
//       <TextField source="name" />
//       <TextField source="email" />
//     </Datagrid>
//   </List>
// );

// function App() {
//   const [token, setToken] = useState("");
//   const [meetingId, setMeetingId] = useState("");
//   const [participantName, setParticipantName] = useState("");
//   const [micOn, setMicOn] = useState(false);
//   const [webcamOn, setWebcamOn] = useState(false);
//   const [customAudioStream, setCustomAudioStream] = useState(null);
//   const [customVideoStream, setCustomVideoStream] = useState(null);
//   const [isMeetingStarted, setMeetingStarted] = useState(false);
//   const [isMeetingLeft, setIsMeetingLeft] = useState(false);

//   const [user, setUser] = useState(() => {
//     const saved = localStorage.getItem("user");
//     return saved ? JSON.parse(saved) : null;
//   });

//   const isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;

//   useEffect(() => {
//     if (isMobile) {
//       window.onbeforeunload = () => {
//         return "Are you sure you want to exit?";
//       };
//     }
//   }, [isMobile]);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <Router>
//       <Routes>

//         {/* Главная страница */}
//         <Route
//           path="/"
//           element={
//             <div style={{ padding: "2rem" }}>
//               <h1>Welcome to the app!</h1>
//               <p>
//                 Go to <a href="/admin">Admin Panel</a> or <a href="/video">Video Meeting</a>
//               </p>

//               {!user ? (
//                 <div style={{ marginTop: "2rem" }}>
//                   <GoogleLogin
//                     onSuccess={(credentialResponse) => {
//                       const decoded = jwt_decode(credentialResponse.credential);
//                       setUser(decoded);
//                       localStorage.setItem("user", JSON.stringify(decoded));
//                     }}
//                     onError={() => {
//                       console.log("Login Failed");
//                     }}
//                   />
//                 </div>
//               ) : (
//                 <div style={{ marginTop: "2rem" }}>
//                   <p>👋 Hello, {user.name}!</p>
//                   <button onClick={handleLogout}>Logout</button>
//                 </div>
//               )}
//             </div>
//           }
//         />

//         {/* Админка — доступ только при входе */}
//         <Route
//           path="/admin"
//           element={
//             user ? (
//               <Admin dataProvider={dataProvider}>
//                 <Resource name="users" list={UserList} />
//               </Admin>
//             ) : (
//               <Navigate to="/" />  {/* Редирект на главную, если нет доступа */}
//             )
//           }
//         />

//         {/* Видео-звонок */}
//         <Route
//           path="/video"
//           element={
//             <MeetingAppProvider>
//               {isMeetingStarted ? (
//                 <MeetingProvider
//                   config={{
//                     meetingId,
//                     micEnabled: micOn,
//                     webcamEnabled: webcamOn,
//                     name: participantName ? participantName : "TestUser",
//                     multiStream: true,
//                     customCameraVideoTrack: customVideoStream,
//                     customMicrophoneAudioTrack: customAudioStream,
//                   }}
//                   token={token}
//                   reinitialiseMeetingOnConfigChange={true}
//                   joinWithoutUserInteraction={true}
//                 >
//                   <MeetingContainer
//                     onMeetingLeave={() => {
//                       setToken("");
//                       setMeetingId("");
//                       setParticipantName("");
//                       setWebcamOn(false);
//                       setMicOn(false);
//                       setMeetingStarted(false);
//                     }}
//                     setIsMeetingLeft={setIsMeetingLeft}
//                   />
//                 </MeetingProvider>
//               ) : isMeetingLeft ? (
//                 <LeaveScreen setIsMeetingLeft={setIsMeetingLeft} />
//               ) : (
//                 <JoiningScreen
//                   participantName={participantName}
//                   setParticipantName={setParticipantName}
//                   setMeetingId={setMeetingId}
//                   setToken={setToken}
//                   micOn={micOn}
//                   setMicOn={setMicOn}
//                   webcamOn={webcamOn}
//                   setWebcamOn={setWebcamOn}
//                   customAudioStream={customAudioStream}
//                   setCustomAudioStream={setCustomAudioStream}
//                   customVideoStream={customVideoStream}
//                   setCustomVideoStream={setCustomVideoStream}
//                   onClickStartMeeting={() => {
//                     setMeetingStarted(true);
//                   }}
//                   startMeeting={isMeetingStarted}
//                   setIsMeetingLeft={setIsMeetingLeft}
//                 />
//               )}
//             </MeetingAppProvider>
//           }
//         />

//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import { MeetingAppProvider } from "./MeetingAppContextDef";
import { MeetingContainer } from "./meeting/MeetingContainer";
import { LeaveScreen } from "./components/screens/LeaveScreen";
import { JoiningScreen } from "./components/screens/JoiningScreen";

function App() {
  const [token, setToken] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [micOn, setMicOn] = useState(false);
  const [webcamOn, setWebcamOn] = useState(false);
  const [customAudioStream, setCustomAudioStream] = useState(null);
  const [customVideoStream, setCustomVideoStream] = useState(null);
  const [isMeetingStarted, setMeetingStarted] = useState(false);
  const [isMeetingLeft, setIsMeetingLeft] = useState(false);
  const [googleAuthToken, setGoogleAuthToken] = useState(null); // Для хранения токена Google

  const isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;

  useEffect(() => {
    if (isMobile) {
      window.onbeforeunload = () => {
        return "Are you sure you want to exit?";
      };
    }
  }, [isMobile]);

  // Обработчик успешной авторизации с Google
  const handleGoogleSuccess = (response) => {
    setGoogleAuthToken(response.credential); // Сохранение токена
    console.log("Google login successful:", response);
  };

  // Обработчик ошибки авторизации с Google
  const handleGoogleError = (error) => {
    console.log("Google login error:", error);
  };

  return (
    <GoogleOAuthProvider clientId="684662195771-vmh3kgdooeccuafc3as1u3jjmmcv3k5i.apps.googleusercontent.com">
      <MeetingAppProvider>
        {!googleAuthToken ? (
          // Если Google авторизация не выполнена
          <div>
            <h1>Sign in with Google</h1>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          </div>
        ) : isMeetingStarted ? (
          // Если встреча начата
          <MeetingProvider
            config={{
              meetingId,
              micEnabled: micOn,
              webcamEnabled: webcamOn,
              name: participantName ? participantName : "TestUser",
              multiStream: true,
              customCameraVideoTrack: customVideoStream,
              customMicrophoneAudioTrack: customAudioStream
            }}
            token={token}
            reinitialiseMeetingOnConfigChange={true}
            joinWithoutUserInteraction={true}
          >
            <MeetingContainer
              onMeetingLeave={() => {
                setToken("");
                setMeetingId("");
                setParticipantName("");
                setWebcamOn(false);
                setMicOn(false);
                setMeetingStarted(false);
              }}
              setIsMeetingLeft={setIsMeetingLeft}
            />
          </MeetingProvider>
        ) : isMeetingLeft ? (
          // Если встреча завершена и пользователь покинул её
          <LeaveScreen setIsMeetingLeft={setIsMeetingLeft} />
        ) : (
          // Страница для ввода данных перед встречей
          <JoiningScreen
            participantName={participantName}
            setParticipantName={setParticipantName}
            setMeetingId={setMeetingId}
            setToken={setToken}
            micOn={micOn}
            setMicOn={setMicOn}
            webcamOn={webcamOn}
            setWebcamOn={setWebcamOn}
            customAudioStream={customAudioStream}
            setCustomAudioStream={setCustomAudioStream}
            customVideoStream={customVideoStream}
            setCustomVideoStream={setCustomVideoStream}
            onClickStartMeeting={() => {
              setMeetingStarted(true);
            }}
            startMeeting={isMeetingStarted}
            setIsMeetingLeft={setIsMeetingLeft}
          />
        )}
      </MeetingAppProvider>
    </GoogleOAuthProvider>
  );
}

export default App;