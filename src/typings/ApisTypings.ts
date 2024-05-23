
export interface TableData{
    col1:string | number | Date,
    col2:string | number | Date,
    col3:string | number | Date,
    col4:string | number | Date,
    col5:string | number | Date,
    col6:string | number | Date,
    col7:string | number | Date,
    col8:string | number | Date,
}

export interface TableResponseObject{
    status:number,
    data:TableData[]
}

export interface AdminRequestsListTableData{
    name:string,
    email:string,
		wfhReason:string,
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
    message:string,
		totalRecords:number
}

export interface SystemOrganisationListTableData{
    uniqueName:string,
    displayName:string,
    admin:string,
    maxWfh:number
}

export interface SystemOrganisationListTableResponseObject{
    status:number,
    data:SystemOrganisationListTableData[],
    message:string,
		totalRecords:number
}

export interface SystemVerificationResponseObject{
    status:number,
    message:string
}

export interface AcceptRejectDeleteResponse {
    status:number,
    message:string
}

export interface VerifyUser{
    status:number,
    admin:string
}

export interface OtpResponse{
    status:number,
    message:string,
    token:string
}

export interface GetOrganisationsResponse{
    status:number,
    message:string,
    data:string[]
}

export interface EditUserParameters{
    organisationUserOldEmail:string,
    organisationUniqueName:string|undefined,
    organisationUserEmail:string,
    firstName:string,
    lastName:string,
    dateOfBirth:Date
}

export interface EditOrganisationParameters{
    organisationUniqueName:string | undefined,
    organisationNewUniqueName:string | undefined,
    organisationNewDisplayName:string | undefined,
    organisationNewAdmin:string|undefined,
    organisationNewMaxWfh:number | undefined
}

export interface CreateOrganisationParameters{
    organisationUniqueName:string | undefined,
    organisationDisplayName:string | undefined,
    organisationMaxWfh:number | undefined
}

export interface AddUserParameters{
    organisationUniqueName:string | undefined,
    organisationUserEmail:string | undefined,
    firstName:string | undefined,
    lastName:string | undefined,
    dateOfBirth:Date | undefined
}

export interface CalendarData{
    availedAt: Date,
    createdAt: Date,
    approvalAt: Date,
    requestStatus:string,
		wfhReason:string,
    rejectionReason:string
}

export interface CalendarResponse{
    status:number,
    data:CalendarData[],
    message:string,
    wfh:number,
    maxWfh:number
}

export interface GetUsersResponse{
    status:number,
    message:string,
    data:string[]
}

export interface GetUserWfhResponse{
    status:number,
    message:string,
    wfh:number,
    maxWfh:number
}
