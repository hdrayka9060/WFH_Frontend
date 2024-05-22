import { useNavigate } from "react-router-dom";
import Icon from '../../atoms/Icon/index';
import styles from './Navbar.module.scss';
import {Navbar, Nav} from 'rsuite';

import logo from '../../resources/RemotHQLogo.jpg';
import logoutIcon from '../../resources/logout.png';
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getUserWfh } from "../../services/OrganisationUserApi";
import { ToastContainer, toast } from "react-toastify";

function NavBar (props:NavbarProps){

    const navigator = useNavigate();

    const token=Cookies.get("token");

    const [wfh,changeWfh]=useState<number>(0);
    const [maxWfh,changeMaxWfh]=useState<number>(0);


    async function getWfh() {
        const res=await getUserWfh(token);
        if(res.status===200){
            changeWfh(res.wfh);
            changeMaxWfh(res.maxWfh);
        }
        else toast.error(res.message);
    }

    useEffect(()=>{
        if(props.userType!=='system'){
            getWfh();
        }
        if(!Cookies.get('token')){
            navigator('/')
        }
        window.addEventListener('beforeunload', function (e) {
            // e.preventDefault();
            // handleLogout();
        });
    },[]);

    const handleLogout=()=>{
        Cookies.remove('email');
        Cookies.remove('organisation');
        Cookies.remove('userType');
        Cookies.remove('token');
        navigator('/')
    }

    return(
        <div className={styles.navbarDiv}>
            <ToastContainer/>
            <Navbar className={styles.navbarNavbar}>
                
                <Navbar.Brand className={styles.navbarNavbarBrand} href="#"> <Icon icon={logo} altText='Logo' width={45} /> Remote <span className={styles.navbarNavbarBrandSpan}>HQ</span></Navbar.Brand>
                <Nav pullRight>
                <Nav>
                {props.userType==="admin"?
                <><Nav.Item onClick={()=>navigator('/organisation-user/requests')} >Requests</Nav.Item>
                <Nav.Item onClick={()=>navigator('/organisation-user/calendar')}>Calendar</Nav.Item></>:<></>}
                </Nav>
                {props.userType==="admin"||props.userType==="user"?<Nav.Item >{`WFH:${wfh}/${maxWfh}`}</Nav.Item>:<></>}
                <Nav.Item className={styles.navbarProfileIcon} onClick={handleLogout} ><Icon icon={logoutIcon} altText='Down Icon' width={20} /></Nav.Item>
                </Nav>
            </Navbar>
        </div>
    );
}

export default NavBar

