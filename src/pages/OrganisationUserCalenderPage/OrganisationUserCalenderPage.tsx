import NavBar from '../../organisms/Navbar/index';
import CalendarPlot from '../../organisms/CalendarPlot/index';
import { OrganisationUserCalenderPageProps } from './OrganisationUserCalenderPage.types';

function OrganisationUserCalenderPage (props:OrganisationUserCalenderPageProps){

    return(
        <div>
            <NavBar wfh={props.wfh} maxWfh={props.maxWfh} userType='user'/>
            <CalendarPlot wfh={props.wfh} maxWfh={props.maxWfh} changeWfh={props.changeWfh} changeMaxWfh={props.changeMaxWfh}  />
        </div>
    );
}

export default OrganisationUserCalenderPage;
