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
		const [limit, setLimit] =useState<number>(10);
		const [page, setPage] =useState<number>(1);
    let org:string;
    if(props.organisation){
        Cookies.set('organisation',props.organisation);
        org=props.organisation;
    }
    else org=`${Cookies.get('organisation')}`;
    return(
        <div>
            <NavBar wfh={0} maxWfh={0} userType='system'/>
            <PageHeader limit={limit} page={page} setPage={setPage} setLimit={setLimit} changeData={changeData} changeIsFilterPending={()=>{}}  organisation={org} toggleWhat='addUser' addbutton={true} pageHeading={org} addButtonText='Add User' />
            <OrganisationDataTable limit={limit} page={page} setPage={setPage} setLimit={setLimit} data={data} changeData={changeData} organisation={org} head={head}  />
        </div>
    );
}

export default SystemUserOrganisationPage;
