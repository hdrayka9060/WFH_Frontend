import styles from './Icon.module.scss';

function Icon (props:IconProps){
    return(
        <div className={styles.iconDiv}>
            <img src={props.icon} alt={props.altText} className={styles.iconImg} width={props.width} />
        </div>
    );
}

export default Icon;