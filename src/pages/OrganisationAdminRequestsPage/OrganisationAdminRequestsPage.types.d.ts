export interface OrganisationAdminRequestsPagePorps{
	wfh:number,
	maxWfh:number,
	changeWfh:(value:number)=>void,
	changeMaxWfh:(value:number)=>void
}

export interface SystemOrganisationDataTableData{
    name:string,
    email:string,
    wfh:string,
		wfhReason:string,
    requestStatus:string,
    availedAt:Date,
    createdAt:Date
}
