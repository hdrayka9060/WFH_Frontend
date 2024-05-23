import { ReactElement } from "react";

export declare namespace TypeAttributes {
    type Status = 'success' | 'warning' | 'error' | 'info';
    type ToggleWhat='addUser' | 'createOrganisation' |'nothing';
}

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

export interface TableData{
    col1:string | number | Date | ReactElement,
    col2:string | number | Date | ReactElement,
    col3:string | number | Date | ReactElement,
    col4:string | number | Date | ReactElement,
    col5:string | number | Date | ReactElement,
    col6:string | number | Date | ReactElement,
    col7:string | number | Date | ReactElement,
    col8:string | number | Date | ReactElement,
}

export interface TableResponseObject{
    status:number,
    data:TableData[]
}

export interface SystemOrganisationListTableData{
    col1:string,
    col2:string,
    col3:string,
    col4:number,
}

export interface SystemOrganisationListTableResponseObject{
    status:number,
    data:SystemOrganisationListTableData[]
}

export interface SystemOrganisationDataTableData{
    uniqueName:string,
    displayName:string,
    admin:string,
    maxWfh:number
}

export interface SystemOrganisationDataTableResponseObject{
    status:number,
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
    status:number,
    data:AdminRequestsListTableData[]
}

export interface AcceptRejectDeleteResponse {
    status:number,
    message:string
}
