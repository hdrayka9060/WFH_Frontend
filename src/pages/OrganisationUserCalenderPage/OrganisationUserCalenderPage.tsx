import NavBar from '../../organisms/Navbar/index';
import CalendarPlot from '../../organisms/CalendarPlot/index';
import { OrganisationUserCalenderPageProps } from './OrganisationUserCalenderPage.types';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

function OrganisationUserCalenderPage (props:OrganisationUserCalenderPageProps){
    useEffect(()=>{Cookies.set('page','admin-calender')},[]);
    return(
        <div>
            <NavBar userType='user'/>
            <CalendarPlot />
        </div>
    );
}

export default OrganisationUserCalenderPage;