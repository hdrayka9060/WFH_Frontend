import styles from './MessagePopup.module.scss';
import { Message } from 'rsuite';
import { MessagePopupProps } from './MessagePopup.types';
import classNames from 'classnames/bind';

const cx=classNames.bind(styles);

function MessagePopup(props:MessagePopupProps){
    return(
        <div className={cx('messageDiv')}>
            <Message className={cx('messageMessage')} type={props.type} bordered showIcon>
                <strong>{props.head}!</strong> {props.message}
            </Message>
        </div>
    );
}

export default MessagePopup;