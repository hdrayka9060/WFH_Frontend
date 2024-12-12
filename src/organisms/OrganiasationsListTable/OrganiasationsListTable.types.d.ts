export interface TableHead{
    'id':string,
    'uniqueName':string,
    'displayName':string,
    'admin':string,
    'maxWfh':string,
    'action':string
}

export interface TablePlotProps{

    head:TableHead
    setOrganisation:(value:stirng)=>void,
    data:SystemOrganisationDataTableData[],
    changeData:(data:SystemOrganisationDataTableData[])=>void,
		limit:number,
		page:number,
		setLimit:(num:number)=>void,
		setPage:(num:number)=>void
}

export interface SystemOrganisationListTableResponseObject{
    error:string,
		ok:boolean,
    data:SystemOrganisationListTableData[]
}

export interface SystemOrganisationDataTableData{
    uniqueName:string,
    displayName:string,
    admin:string,
    maxWfh:number
}

export interface SystemOrganisationDataTableResponseObject{
    error:string,
		ok:boolean,
    data:SystemOrganisationDataTableData[],
    message:string,
		totalRecords:number
}

export interface AdminRequestsListTableData{
    col1:string,
    col2:string,
    col3:string,
    col4:number,
    col5:string
}

export interface AdminRequestsListTableResponseObject{
    error:string,
		ok:boolean,
    data:AdminRequestsListTableData[]
}

export interface AcceptRejectDeleteResponse {
    error:string,
		ok:boolean,
    message:string
}
