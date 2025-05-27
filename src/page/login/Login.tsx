import { useNavigate } from 'react-router-dom';
import Logo from '../../component/logo/Logo';
import s from './Login.module.css';
import { motion } from 'framer-motion';
import useScreenWidth from '../../hooks/useScreenWidth';

const Login = () => {
    const nav = useNavigate();
    const screenWidth = useScreenWidth();
    return (
        <>
            <Logo />
            <motion.div
                initial={{ x: screenWidth, scale: 1 }}
                animate={{ opacity: 1, x: 0 , scale: 1}}
                exit={{ x: screenWidth, scale: 0}}
                transition={{
                    duration: 0.3,
                    ease: 'easeOut'
                }}
            >   <div className={s.container}>
                    <div className={s.loginContainer}>
                        <div className={s.loginTitle}>로그인</div>
                        <div className={s.inputContainer}>
                            <div className={s.idWrapper}>
                                <input placeholder='아이디' className={s.id} />
                                <img src='/icon/login_id.png' className={s.iconId} />
                            </div>
                            <div className={s.pwWrapper}>
                                <input placeholder='비밀번호' type='password' className={s.pw} />
                                <img src='/icon/login_pw.png' className={s.iconPw} />
                            </div>
                            <button className={s.login}>로그인</button>
                        </div>
                        <p onClick={() => nav('/join')} className={s.join}>회원 가입하기</p>
                    </div>
                </div>
            </motion.div>
        </>
    )
}
export default Login;