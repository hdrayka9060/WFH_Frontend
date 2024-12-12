import { useNavigate } from "react-router-dom";
import Icon from '../../atoms/Icon/index';
import styles from './Navbar.module.scss';
import {Navbar, Nav} from 'rsuite';

import logo from '../../resources/RemotHQLogo.jpg';
import logoutIcon from '../../resources/logout.png';
import Cookies from "js-cookie";
import { useEffect } from "react";

function NavBar (props:NavbarProps){

    const navigator = useNavigate();

    useEffect(()=>{
        if(!Cookies.get('token')){
            navigator('/')
        }
    },[]);

    const handleLogout=()=>{
        Cookies.remove('email');
        Cookies.remove('organisation');
        Cookies.remove('userType');
        Cookies.remove('token');
				Cookies.remove("wfh");
				Cookies.remove('maxWfh');
        navigator('/')
    }

    return(
        <div className={styles.navbarDiv}>
            <Navbar className={styles.navbarNavbar}>

                <Navbar.Brand className={styles.navbarNavbarBrand} href="#"> <Icon icon={logo} altText='Logo' width={45} /> Remote <span className={styles.navbarNavbarBrandSpan}>HQ</span></Navbar.Brand>
                <Nav pullRight>
                <Nav>
                {props.userType==="admin"?
                <><Nav.Item onClick={()=>navigator('/organisation-user/requests')} >Requests</Nav.Item>
                <Nav.Item onClick={()=>navigator('/organisation-user/calendar')}>Calendar</Nav.Item></>:<></>}
                </Nav>
                {props.userType==="admin"||props.userType==="user"?<Nav.Item >{`WFH:${props.wfh}/${props.maxWfh}`}</Nav.Item>:<></>}
                <Nav.Item className={styles.navbarProfileIcon} onClick={handleLogout} ><Icon icon={logoutIcon} altText='Down Icon' width={20} /></Nav.Item>
                </Nav>
            </Navbar>
        </div>
    );
}

export default NavBar

