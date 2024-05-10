import styles from './MessagePopup.module.scss';
import { Message } from 'rsuite';

import { MessagePopupProps,TypeAttributes } from './MessagePopup.types';

function MessagePopup(props:MessagePopupProps){
    return(
        <div className={styles.messageDiv}>
            <Message className={styles.messageMessage} type={props.type} bordered showIcon>
                <strong>{props.head}!</strong> {props.message}
            </Message>
        </div>
    );
}

export default MessagePopup;