import styles from './LoginForm.module.scss';
import { Heading,Input,Button, SelectPicker } from 'rsuite';
import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import MessagePopup from '../../molecules/Message/index';
import { requestOtp,verifyOtp, verifySystemUser ,verifyOrganisation, verifyOrganisationUser,getOrganisations} from '../../services/OtpAPis';
import { LoginFormProps, TypeAttributes,GetOrganisationsResponse } from './LoginForm.types';
import classNames from 'classnames/bind';

import {ToastContainer, toast } from 'react-toastify';

const cx=classNames.bind(styles);

function LoginForm(props:LoginFormProps){
    
    const navigator = useNavigate();

    const [organisationList,changeOrganisationList] =useState<string[]>([""]);

    const [email,changeEmail]=useState<string>("");
    const [otp,changeOtp]=useState<string>("");
    const [organisation,changeOrganisation]=useState<string>("");

    const [userType,changeUserType]=useState<string>(props.userType);
    const [isValidUser,changeIsValidUser]=useState<boolean>(false);

    const [getOtpText,changeGetOtpText]=useState<string>('Get OTP');
    const [getOtpDisable,changeGetOtpDisable]=useState<boolean>(false);
    const [loginBtnDisable,changeLoginBtnDisable]=useState<boolean>(false);

    const [messageType,changeMessageType]=useState<TypeAttributes.Status>('info');
    const [messageHead,changeMessageHead]=useState<string>("");
    const [messageMessage,changeMessageMessage]=useState<string>("");

    const [toggleMessage,changeToggleMessage]=useState<boolean>(false);

    const setToggleMessage=(type:TypeAttributes.Status, head:string, message:string)=>{
        changeToggleMessage(true);
        changeMessageType(type);
        changeMessageHead(head);
        changeMessageMessage(message);
        setTimeout(()=>changeToggleMessage(false),1500);
    }

    async function getOrganisationList(){
        const res:GetOrganisationsResponse=await getOrganisations();
        if(res.status===200){
            changeOrganisationList(res.data);
        }
        else toast.error(res.message);
    }

    useEffect(()=>{
        if(typeof Cookies.get('token')!=='undefined'){
            if(Cookies.get('userType')==='system')navigator('/system-user/landing');
            else if(Cookies.get('userType')==='admin')navigator('/organisation-user/requests');
            else navigator('/organisation-user/user-calendar');
        }
        if(props.userType==='organisation'){
            getOrganisationList();
        }
    },[]);

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
            if((otp[i]<'0' || otp[i]>'9'))return false;
        }
        return true;
    }

    const validateSystesmUser=async ()=>{
        // console.log('email',email)
        const res=await verifySystemUser(email);
        // console.log('res1',res);
        if(res.status===200){
            return true;
        }
        else if(res.status===400){
            toast.error("Enter valid email");
        }
        else {
            toast.error("Something went wrong");
        }
        return false;
    }

    const validateOrgnisationAndUser=async ()=>{
        const org=await verifyOrganisation(organisation);
        const user=await verifyOrganisationUser(email,organisation);
        // console.log('org',org);
        // console.log('user',user);
        if(user.admin===email)changeUserType('admin');
        else changeUserType('user')
        if(org.status===200 && user.status===200){
            return true;
        }
        else if(org.status===400){
            toast.error("Enter valid organisation");
        }
        else if(user.status===400){
            toast.error("Enter valid email");
        }
        else {
            toast.error("Something went wrong");
        }
        return false;
    }

    const handleGetOtp=async()=>{
        if(props.userType==='organisation' && organisation.length===0){
            toast.error("Organisation is required",{
                position:"top-right"
            });
            return;
        }
        if(!validateEmail()){
            toast.error("Enter valid email");
            return;
        }
        // console.log('test1 pass');
        changeGetOtpDisable(true);
        changeGetOtpText("Validating...")
        var sys=false;
        var org=false;
        if(props.userType==='system')sys= await validateSystesmUser();
        else if(props.userType==='organisation')org= await validateOrgnisationAndUser();
        // console.log('test2 pass',sys,org);
        if(sys || org){
            changeGetOtpText("Sending OTP...")
            const res=await requestOtp(email);
            if(res.status===200){
                toast.success(res.message)
                changeIsValidUser(true);
            }
            else{
                changeGetOtpDisable(false);
                changeGetOtpText("Get OTP");
            }
        }
        else{
            changeGetOtpDisable(false);
            changeGetOtpText("Get OTP");
        }
    }

    const handleLoginCLick=async ()=>{
        if(!validateOtp()){
            toast.error("Enter valid otp");
            // console.log("Invalid Otp")
            return;
        }
        changeLoginBtnDisable(true);
        const res=await verifyOtp(email,otp,userType,organisation);
        if(res.status===200){
            Cookies.set('email',email,{expires:1});
            Cookies.set('organisation',organisation,{expires:1});
            Cookies.set('userType',userType,{expires:1});
            Cookies.set('token',res.token,{expires:1});
            toast.success(res.message)
            if(userType==='system')navigator('/system-user/landing');
            if(userType==='admin' )navigator('/organisation-user/requests');
            if(userType==='user')navigator('/organisation-user/user-calendar');
        }
        else if(res.status===400) toast.error(res.message);
        else toast.error("Something went wrong");
        changeLoginBtnDisable(false);
    }
    return(
        <>
        <ToastContainer/>
        {toggleMessage?<MessagePopup type={messageType} head={messageHead} message={messageMessage}/>:<></>}
        <div className={cx('loginFormDiv')}>
            <Heading level={2} className={cx('loginFormHeading')} >Sign in to RemoteHQ    </Heading>
            
            {props.userType==="organisation"?<><span className={cx('lebal')}>Organisation Unique Name <span className={cx('estric')}>*</span></span><SelectPicker onChange={(e)=>{changeOrganisation(`${e}`)}} onClean={()=>changeOrganisation('')} data={organisationList.map(item => ({ label: item, value: item }))} searchable={true} placeholder="Select Organisation" disabled={isValidUser} className={cx('loginFormSelectPicker')} /></>:<></>}
            <span className={cx('lebal')}>Email <span className={cx('estric')}>*</span></span>
            <Input onChange={(e)=>{changeEmail(e)}} placeholder="Enter Email" disabled={isValidUser} className={cx('loginFormInput')}/>
            {!isValidUser?<Button disabled={getOtpDisable} className={cx('loginFormSubmit')} onClick={handleGetOtp} >{getOtpText}</Button>:<></>}
            {
                isValidUser?(<>
                    <span className={cx('lebal')}>OTP <span className={cx('estric')}>*</span></span>
                    <Input onChange={(e)=>{changeOtp(e)}} placeholder="Enter OTP" type='password' className={cx('loginFormInput')} />
                    <Button disabled={loginBtnDisable} className={cx('loginFormSubmit')} onClick={handleLoginCLick} >Log in</Button>
                    
                </>):<></>
            }
        </div>
        </>
    );
}

export default LoginForm;