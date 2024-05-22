import styles from './Icon.module.scss';
import classNames from 'classnames/bind';

const cx=classNames.bind(styles);

function Icon (props:IconProps){
    return(

        <div className={cx('iconDiv')}>
            <img src={props.icon} alt={props.altText} className={styles.iconImg} width={props.width} />
        </div>
    );
}

export default Icon;