import styles from './LoginOptionsPage.module.scss';

import Icon from '../../atoms/Icon/Icon';
import LoginOptions from '../../molecules/LoginOptions/LoginOptions';

import logo from '../../resoruces/RemotHQLogo.jpg';

function LoginOptionsPage (props:LoginOptionsPageProps) {
    return (
      <div className={styles.loginOptionsPageDiv}>
        {/* <Icon  icon={logo} altText='Logo' width={45} /> */}
        <LoginOptions />
      </div>
    );
}


export default LoginOptionsPage;