export declare namespace TypeAttributes {
    type Status = 'success' | 'warning' | 'error' | 'info';
    type UserType='system' | 'organisation';
    type OrgUserType='user' | 'admin';
}

export interface LoginFormProps{
    userType:string
}

export interface OtpResponse{
    status:number,
    message:string
}

export interface GetOrganisationsResponse{
    status:number,
    message:string,
    data:string[]
}