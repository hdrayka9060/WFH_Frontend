import Cookies from 'js-cookie';
import PageHeader from '../../molecules/PageHeader/index';
import NavBar from '../../organisms/Navbar/index';
import OrganisationDataTable from '../../organisms/OrganiasationsDataTable/index';
import { SystemUserOrganisationPageProps,SystemOrganisationDataTableData } from './SystemUserOrganisationPage.types';
import { useState } from 'react';
function SystemUserOrganisationPage (props:SystemUserOrganisationPageProps){
    const head={
        'id':'Sr', 
        'firstName':"First Name",
        'lastName':"Last Name",
        'email':"Email",
        'dateOfJoining':"Date of Joining",
        'wfh':"WFH",
        'dateOfBirth':'Date Of Birth',
        'action':'Action'
    };

    const [data,changeData]=useState<SystemOrganisationDataTableData[]>([]);

    let org:string;
    if(props.organisation){
        Cookies.set('organisation',props.organisation);
        org=props.organisation;
    }
    else org=`${Cookies.get('organisation')}`;
    return(
        <div>
            <NavBar userType='system'/>
            <PageHeader changeData={changeData} changeIsFilterPending={()=>{}}  organisation={org} toggleWhat='addUser' addbutton={true} pageHeading={org} addButtonText='Add User' />
            <OrganisationDataTable data={data} changeData={changeData} organisation={org} head={head}  />
        </div>
    );
}

export default SystemUserOrganisationPage;