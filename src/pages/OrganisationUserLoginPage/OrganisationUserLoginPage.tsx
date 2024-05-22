import LoginForm from '../../organisms/LoginForm/index';

function OrganisationUserLoginPage (props:OrganisationUserLoginPageProps){
    return(
        <div>
            <LoginForm userType="organisation" />
        </div>
    );

}

export default OrganisationUserLoginPage;