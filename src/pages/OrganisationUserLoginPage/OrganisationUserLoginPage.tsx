import styles from './OrganisationUserLoginPage.module.scss';

import logo from '../../resoruces/RemotHQLogo.jpg';

import Icon from '../../atoms/Icon/Icon';
import LoginForm from '../../organisms/LoginForm/LoginForm';

function OrganisationUserLoginPage (props:OrganisationUserLoginPageProps){
    return(
        <div>
            {/* <Icon icon={logo} altText='Logo' width={45} /> */}
            <LoginForm userType="organisation" />
        </div>
    );

}

export default OrganisationUserLoginPage;