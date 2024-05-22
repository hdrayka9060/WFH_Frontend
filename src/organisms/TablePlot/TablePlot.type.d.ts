import { ReactElement } from "react";

export declare namespace TypeAttributes {
    type Status = 'success' | 'warning' | 'error' | 'info';
    type ToggleWhat='addUser' | 'createOrganisation' |'nothing';
}

export interface TableHead{
    'col1':string, 
    'col2':string,
    'col3':string,
    'col4':string,
    'col5':string,
    'col6':string,
    'col7':string,
    'col8':string
}

export interface TablePlotProps{
    sortColumn:number,
    head:TableHead,
    page:string,
    // setOrganisation:(value:stirng)=>void,
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
    col1:string,
    col2:string,
    col3:string,
    col4:Date,
    col5:Date,
    col6:number
}

export interface SystemOrganisationDataTableResponseObject{
    status:number,
    data:SystemOrganisationDataTableData[]
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