export interface LoginFormProps{
    userType:string
}

export interface OtpResponse{
		error:string,
		ok:boolean,
    message:string
}

export interface GetOrganisationsResponse{
		error:string,
		ok:boolean,
    message:string,
    data:string[]
}
