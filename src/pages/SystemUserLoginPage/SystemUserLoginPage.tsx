import styles from './SystemUserLoginPage.module.scss';

import LoginForm from '../../organisms/LoginForm/LoginForm';

function SystemUserLoginPage (props:SystemUserLoginPageProps){
    return(
        <div>
            <LoginForm  userType="system" />
        </div>
    );

}

export default SystemUserLoginPage;