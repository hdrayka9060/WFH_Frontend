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
    data:AdminRequestsListTableData[],
    message:string,
		totalRecords:number,
		error:string,
		ok:boolean,
		// wfh:number,
    // maxWfh:number
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

export interface SystemOrganisationListTableData{
    uniqueName:string,
    displayName:string,
    admin:string,
    maxWfh:number
}

export interface SystemOrganisationListTableResponseObject{
    error:string,
	  ok:boolean,
    data:SystemOrganisationListTableData[],
    message:string,
		totalRecords:number
}

export interface SystemVerificationResponseObject{
    error:string,
	  ok:boolean,
    message:string
}

export interface AcceptRejectDeleteResponse {
    error:string,
	  ok:boolean,
    message:string
}

export interface VerifyUser{
    error:string,
	  ok:boolean,
    admin:string
}

export interface OtpResponse{
    error:string,
	  ok:boolean,
    message:string,
    token:string
}

export interface GetOrganisationsResponse{
    error:string,
	  ok:boolean,
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
    error:string,
	  ok:boolean,
    data:CalendarData[],
    message:string,
    // wfh:number,
    maxWfh:number
}

export interface GetUsersResponse{
	error:string,
	ok:boolean,
    message:string,
    data:string[]
}

export interface GetUserWfhResponse{
    error:string,
	  ok:boolean,
    message:string,
    wfh:number,
    maxWfh:number
}
