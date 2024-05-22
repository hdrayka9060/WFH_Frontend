import axios from "axios";
import { OtpResponse,VerifyUser,GetOrganisationsResponse } from "../typings/ApisTypings";

// Get opt
export const requestOtp= async (email:string):Promise<OtpResponse>=>{
    let response=await axios.post('http://localhost:8080/otpvalidation/getotp', {email})
    return response.data;
}

// Get organisations
export const getOrganisations=async():Promise<GetOrganisationsResponse>=>{
    let response=await axios.post('http://localhost:8080/otpvalidation/organisations');
    return response.data;
}

// Verify otp
export const verifyOtp=async (email:string,otp:string,userType:string,organisation:string,):Promise<OtpResponse>=>{
    let response=await axios.post('http://localhost:8080/otpvalidation/verifyotp', {userType,email,otp,organisation})
    return response.data;
}

// Verify system user
export const verifySystemUser=async (systemUserEmail:string|undefined):Promise<OtpResponse>=>{
    let response=await axios.post('http://localhost:8080/otpvalidation/verify-system-user', {systemUserEmail});
    return response.data;
}

// Verify user org
export const verifyOrganisation = async (organisation: string): Promise<VerifyUser> => {
    let response = await axios.post('http://localhost:8080/otpvalidation/verify-user-org', {organisation })
    return response.data;
}

// Verify user & org
export const verifyOrganisationUser = async (email: string, organisation: string): Promise<VerifyUser> => {
    let response = await axios.post('http://localhost:8080/otpvalidation/verify-user', { email, organisation })
    return response.data;
}