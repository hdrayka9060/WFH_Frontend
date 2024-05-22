import Icon from '../../atoms/Icon/index';
import styles from './LoginOptions.module.scss';
import {Button,Heading} from 'rsuite';
import { useNavigate } from "react-router-dom";
import classNames from 'classnames/bind';

import sysIcon from '../../resources/systemUser.png';
import orgIcon from '../../resources/orgUser.png';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const cx=classNames.bind(styles);

function LoginOptions (props:LoginOptionsProps){
    const navigator = useNavigate();
    useEffect(()=>{
        if(typeof Cookies.get('token')!=='undefined'){
            if(Cookies.get('userType')==='system')navigator('/system-user/landing');
            else if(Cookies.get('userType')==='admin')navigator('/organisation-user/requests');
            else navigator('/organisation-user/user-calendar');
        }
    },[]);
    return(
        <div className={cx('loginOptionsDiv')}>
            <Heading level={2} className={cx('loginOptionsHeading')}>Sign in to RemoteHQ</Heading>
            <Button onClick={()=>navigator('/system-user/login')} className={cx('loginOptionsButton')} appearance='ghost' startIcon={<Icon icon={sysIcon} altText='System User Icon' width={50} />}>Login as System User</Button>
            <div className={cx('loginOptionsOr')} >or</div>
            <Button onClick={()=>navigator('/organisation-user/login')} className={cx('loginOptionsButton')} appearance='ghost' startIcon={<Icon icon={orgIcon} altText='System User Icon' width={50}/>}>Login as Organisation User</Button>
        </div>
    );
}

export default LoginOptions;