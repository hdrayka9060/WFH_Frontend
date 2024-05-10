import React from 'react';
import './App.css';
import 'rsuite/dist/rsuite.min.css';

import LoginOptionsPage from './pages/LoginOptionsPage/LoginOptionsPage';
import SystemUserLoginPage from './pages/SystemUserLoginPage/SystemUserLoginPage';
import OrganisationUserLoginPage from './pages/OrganisationUserLoginPage/OrganisationUserLoginPage';
import SystemUserLandingPage from './pages/SystemUserLandingPage/SystemUserLandingPage';
function App() {
  return (
    <div className="App">
      {/* <LoginOptionsPage /> */}
      <SystemUserLoginPage />
      {/* <OrganisationUserLoginPage /> */}
      {/* <SystemUserLandingPage /> */}
    </div>
  );
}

export default App;


// @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
// font-family: "Inter", sans-serif;