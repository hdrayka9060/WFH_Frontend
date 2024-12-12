import LoginForm from '../../organisms/LoginForm/index';

function SystemUserLoginPage (props:SystemUserLoginPageProps){
    return(
        <div>
            <LoginForm userType="system" />
        </div>
    );

}

export default SystemUserLoginPage;