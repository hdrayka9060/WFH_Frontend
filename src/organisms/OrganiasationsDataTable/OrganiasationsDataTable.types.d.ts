export interface TableHead{
    'id':string,
    'firstName':string,
    'lastName':string,
    'email':string,
    'dateOfJoining':string,
    'dateOfBirth':string,
    'wfh':string,
    'action':string
}

export interface TablePlotProps{

    head:TableHead,
    organisation:stirng,
    data:SystemOrganisationDataTableData[],
    changeData:(data:SystemOrganisationDataTableData[])=>void,
		limit:number,
		page:number,
		setLimit:(num:number)=>void,
		setPage:(num:number)=>void
}

export interface SystemOrganisationDataTableData{
    firstName:string,
    lastname:string,
    email:string,
    dateOfJoining:Date,
    dateOfBirth:Date,
    wfh:number
}

export interface SystemOrganisationDataTableResponseObject{
    error:string,
		ok:boolean,
    data:SystemOrganisationDataTableData[],
    message:string,
		totalRecords:number
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
