import Icon from '../../atoms/Icon/Icon';
import styles from './Navbar.module.scss';
import {Navbar, Nav} from 'rsuite';

import logo from '../../resoruces/RemotHQLogo.jpg';
import logoutIcon from '../../resoruces/logout.png';

function NavBar (props:NavbarProps){
    return(
        <div className={styles.navbarDiv}>
            <Navbar className={styles.navbarNavbar}>
                
                <Navbar.Brand className={styles.navbarNavbarBrand} href="#"> <Icon icon={logo} altText='Logo' width={45} /> Remote <span className={styles.navbarNavbarBrandSpan}>HQ</span></Navbar.Brand>
                <Nav pullRight>
                <Nav>
                {props.userType==="admin"?
                <><Nav.Item>Requests</Nav.Item>
                <Nav.Item>Calendar</Nav.Item></>:<></>}
                </Nav>
                
                <Nav.Item className={styles.navbarProfileIcon} ><Icon icon={logoutIcon} altText='Down Icon' width={20} /></Nav.Item>
                </Nav>
            </Navbar>
        </div>
    );
}

export default NavBar

