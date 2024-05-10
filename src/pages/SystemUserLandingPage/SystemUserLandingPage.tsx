import PageHeader from '../../molecules/PageHeader/PageHeader';
import NavBar from '../../organisms/Navbar/Navbar';
import TablePlot from '../../organisms/TablePlot/TablePlot';
import styles from './SystemUserLandingPage.module.scss';


function SystemUserLandingPage (props:SystemUserLandingPageProps){
    return(
        <div>
            <NavBar userType='system'/>
            <PageHeader pageHeading="Organisation" addButtonText='Create Organisation' />
            <TablePlot />
        </div>
    );
}

export default SystemUserLandingPage;