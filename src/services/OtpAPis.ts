// Get opt
export const requestOtp= async (email:string)=>{
    // let response= await fetch("request otp api url",{
    //     method : 'POST',
    //     headers : {'Content-Type':'application/json'},
    //     body : JSON.stringify({email})
    // });
    // response =await JSON.parse(response);
    // return response;
    return {success:false,status:404,message:"server error"};
}

// Verify otp
export const verifyOtp=async (email:string,otp:string)=>{
    // let  response= await fetch("verify otp api url",{
    //     method : 'POST',
    //     headers : {'Content-Type':'application/json'},
    //     body : JSON.stringify({email,otp})
    // });
    // response =await JSON.parse(response);
    // return response;
    return {success:true,status:404,message:"server error"};
}
