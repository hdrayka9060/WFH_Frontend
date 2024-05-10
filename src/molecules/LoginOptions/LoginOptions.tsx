import Icon from '../../atoms/Icon/Icon';
import styles from './LoginOptions.module.scss';
import {Button,Heading} from 'rsuite';

import sysIcon from '../../resoruces/systemUser.png';
import orgIcon from '../../resoruces/orgUser.png';

function LoginOptions (props:LoginOptionsProps){
    return(
        <div className={styles.loginOptionsDiv}>
            <Heading level={2} className={styles.loginOptionsHeading}>Sign in to RemoteHQ</Heading>
            <Button className={styles.loginOptionsButton} appearance='ghost' startIcon={<Icon icon={sysIcon} altText='System User Icon' width={50}/>}>Login as System User</Button>
            <div className={styles.loginOptionsOr} >or</div>
            <Button className={styles.loginOptionsButton} appearance='ghost' startIcon={<Icon icon={orgIcon} altText='System User Icon' width={50}/>}>Login as Organisation User</Button>
        </div>
    );
}

export default LoginOptions;