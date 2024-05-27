export interface FilterPopupProps{
    setToggle:() => void,
    changeData:(data:SystemOrganisationDataTableData[])=>void,
    toggle:boolean,
    changeIsFilterPending:(value:boolean)=>void,
		setLimit:(num:number)=>void,
		setPage:(num:number)=>void
		page:number,
		limit:number
}

export interface AdminRequestsListTableData{
    name:string,
    email:string,
    wfh:string,
    requestStatus:string,
    availedAt:Date,
    createdAt:Date
}

export interface AdminRequestsListTableResponseObject{
		error:string,
		ok:boolean,
    data:AdminRequestsListTableData[],
    message:string,
		totalRecords:number
}

export interface GetUsersResponse{
		error:string,
		ok:boolean,
    message:string,
    data:string[]
}
