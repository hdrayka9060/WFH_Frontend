import NavBar from '../../organisms/Navbar/index';
import CalendarPlot from '../../organisms/CalendarPlot';
import { OrganisationAdminCalenderPageProps } from './OrganisationAdminCalenderPage.types';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

function OrganisationAdminCalenderPage (props:OrganisationAdminCalenderPageProps){
    useEffect(()=>{Cookies.set('page','admin-calender')},[]);
    return(
        <div>
            <NavBar userType='admin'/>
            <CalendarPlot />
        </div>
    );
}

export default OrganisationAdminCalenderPage;