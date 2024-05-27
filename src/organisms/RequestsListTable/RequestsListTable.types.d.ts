export declare namespace TypeAttributes {
    type Status = 'success' | 'warning' | 'error' | 'info';
    type ToggleWhat='addUser' | 'createOrganisation' |'nothing';
}

export interface TableHead{
    'id':string,
    'name':string,
    'requestStatus':string,
    'email':string,
		'wfhReason':string,
    'wfh':string,
    'availedAt':string,
    'createdAt':string,
    'accept/reject':string
}

export interface TablePlotProps{
    head:TableHead,
    data:SystemOrganisationDataTableData[],
    changeData:(value:SystemOrganisationDataTableData[])=>void,
    isFilterPending:boolean,
		limit:number,
		page:number,
		setLimit:(num:number)=>void,
		setPage:(num:number)=>void,
		wfh:number,
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

export interface SystemOrganisationDataTableResponseObject{
    error:string,
		ok:boolean,
    data:SystemOrganisationDataTableData[],
    message:string,
		totalRecords:number,
		// wfh:number,
    // maxWfh:number
}

export interface AcceptRejectDeleteResponse {
    error:string,
		ok:boolean,
    message:string
}
