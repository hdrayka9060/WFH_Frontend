import PageHeader from '../../molecules/PageHeader/index';
import NavBar from '../../organisms/Navbar/index';
import OrganisationListTable from '../../organisms/OrganiasationsListTable/index';
import { useState } from 'react';
import {SystemOrganisationDataTableData,SystemUserLandingPageProps} from './SystemUserLandingPage.types'

function SystemUserLandingPage (props:SystemUserLandingPageProps){
    const head={
        'id':'Sr',
        'uniqueName':"Unique Name",
        'displayName':"Display Name",
        'admin':"Admin",
        'maxWfh':"Max WFH",
        'action':'Action'
    };
    const [data,changeData]=useState<SystemOrganisationDataTableData[]>([]);

    return(
        <div>
            <NavBar userType='system'/>
            <PageHeader changeData={changeData} changeIsFilterPending={()=>{}} organisation=''   toggleWhat='createOrganisation' addbutton={true} pageHeading="Organisation" addButtonText='Create Organisation'  />
            <OrganisationListTable data={data} changeData={changeData} setOrganisation={props.setOrganisation} head={head}  />
        </div>
    );
}

export default SystemUserLandingPage;