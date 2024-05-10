import styles from './LoginForm.module.scss';
import { Heading,Input,Button } from 'rsuite';
import {useState} from 'react';
import MessagePopup from '../../molecules/Message/MessagePopup';
import { requestOtp,verifyOtp } from '../../services/OtpAPis';

import { LoginFormProps, TypeAttributes } from './LoginForm.types';


function LoginForm(props:LoginFormProps){

    const [email,changeEmail]=useState<string>("");
    const [otp,changeOtp]=useState<string>("");

    const [messageType,changeMessageType]=useState<TypeAttributes.Status>('info');
    const [messageHead,changeMessageHead]=useState<string>("");
    const [messageMessage,changeMessageMessage]=useState<string>("");

    const [toggleMessage,changeToggleMessage]=useState<boolean>(false);
    const setToggleMessage=(type:TypeAttributes.Status, head:string, message:string)=>{
        changeToggleMessage(true);
        changeMessageType(type);
        changeMessageHead(head);
        changeMessageMessage(message);
        setTimeout(()=>changeToggleMessage(false),1000);
    }

    const validateEmail=():boolean=>{
        if(email.length===0)return false;
        let at=0;
        let dot=0;
        for(let i=0;i<email.length;i++){
            if(email[i]==='@')at+=1;
            if(email[i]==='.')dot+=1;
        }
        return at===1 && dot===1;
    }

    const validateOtp=():boolean=>{
        if(otp.length!==6)return false;
        for(let i=0;i<otp.length;i++){
            if(!(otp[i]<='0' && otp[i]>='9'))return false;
        }
        return true;
    }

    const handleLoginCLick=async ()=>{
        let isValidEmail=validateEmail();
        let isValidOtp=validateOtp();

        if(!isValidEmail){
            setToggleMessage('error',"Error","Enter valid email");
            return;
        }
        if(!isValidOtp){
            setToggleMessage('error',"Error","Enter valid otp");
            return;
        }

        const res=await verifyOtp(email,otp);

        if(res.status===404){
            setToggleMessage('error',"Error","Server error, please try again after sometime.");
        }
        else if(res.status===400){
            setToggleMessage('error',"Error","Enter valid credentials");
        }
        else if(res.status===200){
            setToggleMessage('success',"Success","user verified");
        }
        else{
            setToggleMessage('error',"Error","Something went wrong");
        }

        if(res.status===200){}
    }


    
    const getOtp=async ():Promise<void>=>{
        let isValidEmail=validateEmail();

        if(!isValidEmail){
            setToggleMessage('error',"Error","Enter valid email");
            return;
        }

        const res=await requestOtp(email);

        if(res.status===404){
            setToggleMessage('error',"Error","Server error, please try again after sometime.");
        }
        else if(res.status===400){
            setToggleMessage('error',"Error","Enter valid credentials");
        }
        else if(res.status===200){
            setToggleMessage('success',"Success","user verified");
        }
        else{
            setToggleMessage('error',"Error","Something went wrong");
        }

        if(res.status===200){}
    }


    return(
        <>
        {toggleMessage?<MessagePopup type={messageType} head={messageHead} message={messageMessage}/>:<></>}
        <div className={styles.loginFormDiv}>
            
            <Heading level={2} className={styles.loginFormHeading} >Sing in to RemoteHQ</Heading>
            {props.userType==="organisation"?<Input placeholder="Organisation Unique Name" className={styles.loginFormInput}/>:<></>}
            <Input onChange={(e)=>{changeEmail(e)}} placeholder="Email" className={styles.loginFormInput}/>
            <div onClick={getOtp}  className={styles.loginFormGetOtp}>Request OTP?</div>
            <Input onChange={(e)=>{changeOtp(e)}} placeholder="Password" type='password' className={styles.loginFormInput} />
            <Button className={styles.loginFormSubmit} onClick={handleLoginCLick} >Log in</Button>
        </div>
        </>
    );
}

export default LoginForm;