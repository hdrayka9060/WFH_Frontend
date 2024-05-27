import Cookies from 'js-cookie';
import PageHeader from '../../molecules/PageHeader/index';
import NavBar from '../../organisms/Navbar/index';
import RequestsListTable from '../../organisms/RequestsListTable/index';
import { OrganisationAdminRequestsPagePorps,SystemOrganisationDataTableData } from './OrganisationAdminRequestsPage.types';
import { useState } from 'react';

function OrganisationAdminRequestsPage (props:OrganisationAdminRequestsPagePorps){

	if(props.maxWfh){
		Cookies.set('wfh',props.wfh.toString());
		Cookies.set('maxWfh',props.maxWfh.toString());
	}
	else if(Cookies.get('maxWfh')){
		props.changeMaxWfh(Number(Cookies.get('maxWfh')))
		props.changeWfh(Number(Cookies.get('wfh')))
	}

    const head={
        'id':'Sr',
        'name':"Name",
        'requestStatus':"Request Status",
        'email':"Email",
				'wfhReason':'WFh Reason',
        'wfh':"WFH",
        'availedAt':"Availed At",
        'createdAt':'Created At',
        'accept/reject':"Accept/Reject"
    };

    let org=Cookies.get('organisation');

    const [data,changeData]=useState<SystemOrganisationDataTableData[]>([]);
    const [isFilterPending,changeIsFilterPending]=useState<boolean>(true);

		const [limit, setLimit] =useState<number>(1000);
		const [page, setPage] =useState<number>(1);

    return(

        <div>
            <NavBar wfh={props.wfh} maxWfh={props.maxWfh} userType='admin'/>
            <PageHeader limit={limit} page={page} setPage={setPage} setLimit={setLimit} changeData={changeData} changeIsFilterPending={changeIsFilterPending}  organisation='' toggleWhat='nothing' addbutton={false} pageHeading={org} addButtonText='' />
            <RequestsListTable wfh={props.wfh} changeWfh={props.changeWfh} changeMaxWfh={props.changeMaxWfh} limit={limit} page={page} setPage={setPage} setLimit={setLimit} data={data} isFilterPending={isFilterPending} changeData={changeData} head={head} />
        </div>
    );
}

export default OrganisationAdminRequestsPage;
