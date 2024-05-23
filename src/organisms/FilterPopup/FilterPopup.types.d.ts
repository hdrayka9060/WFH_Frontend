export interface FilterPopupProps{
    setToggle:() => void,
    setMessage:(type:STATUS,head:string,message:string)=> void,
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
		status:number,
    data:AdminRequestsListTableData[],
    message:string,
		totalRecords:number
}

export interface GetUsersResponse{
    status:number,
    message:string,
    data:string[]
}
