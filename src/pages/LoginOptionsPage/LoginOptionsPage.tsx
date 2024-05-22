import styles from './LoginOptionsPage.module.scss';

import LoginOptions from '../../molecules/LoginOptions/index';

import classNames from 'classnames/bind';

const cx=classNames.bind(styles);

function LoginOptionsPage (props:LoginOptionsPageProps) {
    return (
      <div className={cx('loginOptionsPageDiv')}>
        <LoginOptions />
      </div>
    );
}


export default LoginOptionsPage;