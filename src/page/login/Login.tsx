import { useNavigate } from 'react-router-dom';
import Logo from '../../component/logo/Header';
import s from './Login.module.css';
import { motion } from 'framer-motion';
import useScreenWidth from '../../hooks/useScreenWidth';
import { useState } from 'react';
import api from '../../common/axios';

const Login = () => {
    const nav = useNavigate();
    const screenWidth = useScreenWidth();
    const [user, setUser] = useState({ id: '', password: '' });
    const handleLogin = async () => {
        if (user.id === '' || user.password === '') {
            alert('아이디와 비밀번호를 입력해주세요.');
            return;
        }
        const f = new FormData();
        f.append('username', user.id);
        f.append('password', user.password);
        try{
            const res = await api.post('/login', f);
            if (res.status === 200) {
                localStorage.setItem('popcornToken', res.headers.authorization);
                nav('/');
            }
        } catch (err:any) {
            if (err.response.status === 401) {
                alert('아이디 또는 비밀번호가 일치하지 않습니다.');
            } else {
                console.error(err);
                alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
        }
    }
    return (
        <>
            <Logo />
            <motion.div
                initial={{ x: screenWidth, scale: 0 }}
                animate={{ opacity: 1, x: 0 , scale: 1}}
                exit={{ x: screenWidth, scale: 0}}
                transition={{
                    duration: 0.65,
                    ease: 'easeOut'
                }}
            >   <div className={s.container}>
                    <div className={s.loginContainer}>
                        <div className={s.loginTitle}>로그인</div>
                        <div className={s.inputContainer}>
                            <div className={s.idWrapper}>
                                <input value={user.id} onChange={(e) => setUser({ ...user, id: e.target.value })} placeholder='아이디' className={s.id} />
                                <img src='/icon/login_id.png' className={s.iconId} />
                            </div>
                            <div className={s.pwWrapper}>
                                <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder='비밀번호' type='password' className={s.pw} />
                                <img src='/icon/login_pw.png' className={s.iconPw} />
                            </div>
                            <button onClick={handleLogin} className={s.login}>로그인</button>
                        </div>
                        <p onClick={() => nav('/join')} className={s.join}>회원 가입하기</p>
                    </div>
                </div>
            </motion.div>
        </>
    )
}
export default Login;