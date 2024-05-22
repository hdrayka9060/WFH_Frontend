import { ReactElement } from "react";

export declare namespace TypeAttributes {
    type Status = 'success' | 'warning' | 'error' | 'info';
    type ToggleWhat='addUser' | 'createOrganisation' |'nothing';
}

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
    firstName:string,
    lastname:string,
    email:string,
    dateOfJoining:Date,
    dateOfBirth:Date,
    wfh:number
}

export interface SystemOrganisationDataTableResponseObject{
    status:number,
    data:SystemOrganisationDataTableData[],
    message:string
}

export interface AdminRequestsListTableResponseObject{
    status:number,
    data:AdminRequestsListTableData[]
}

export interface AcceptRejectDeleteResponse {
    status:number,
    message:string
}