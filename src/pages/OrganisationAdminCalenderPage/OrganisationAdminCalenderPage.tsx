import NavBar from '../../organisms/Navbar/index';
import CalendarPlot from '../../organisms/CalendarPlot';
import { OrganisationAdminCalenderPageProps } from './OrganisationAdminCalenderPage.types';


function OrganisationAdminCalenderPage (props:OrganisationAdminCalenderPageProps){

    return(
        <div>
            <NavBar wfh={props.wfh} maxWfh={props.maxWfh} userType='admin'/>
            <CalendarPlot wfh={props.wfh} maxWfh={props.maxWfh} changeWfh={props.changeWfh} changeMaxWfh={props.changeMaxWfh} />
        </div>
    );
}

export default OrganisationAdminCalenderPage;
