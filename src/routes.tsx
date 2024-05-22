import React, { useState }  from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';

import LoginOptionsPage from './pages/LoginOptionsPage/LoginOptionsPage';
import SystemUserLoginPage from './pages/SystemUserLoginPage/SystemUserLoginPage';
import OrganisationUserLoginPage from './pages/OrganisationUserLoginPage/OrganisationUserLoginPage';
import SystemUserLandingPage from './pages/SystemUserLandingPage/SystemUserLandingPage';
import SystemUserOrganisationPage from './pages/SystemUserOrganisationPage/SystemUserOrganisationPage';
import OrganisationAdminRequestsPage from './pages/OrganisationAdminRequestsPage/OrganisationAdminRequestsPage';
import OrganisationAdminCalenderPage from './pages/OrganisationAdminCalenderPage/OrganisationAdminCalenderPage';
import OrganisationUserCalenderPage from './pages/OrganisationUserCalenderPage/OrganisationUserCalenderPage';

function Routing() {
  const [organisation,changeOrganisation]=useState<string>("");
  const setOrganisation=(value:string)=>{changeOrganisation(value);}
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginOptionsPage  />} />

        <Route path="/system-user/login" element={<SystemUserLoginPage  />} />
        <Route path="/system-user/landing" element={<SystemUserLandingPage setOrganisation={setOrganisation} />} />
        <Route path="/system-user/organisation" element={<SystemUserOrganisationPage organisation={organisation} />} />

        <Route path="/organisation-user/login" element={<OrganisationUserLoginPage />} />
        <Route path="/organisation-user/requests" element={<OrganisationAdminRequestsPage />} />
        <Route path="/organisation-user/calendar" element={<OrganisationAdminCalenderPage />} />
        <Route path="/organisation-user/user-calendar" element={<OrganisationUserCalenderPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default Routing;