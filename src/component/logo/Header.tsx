import { useNavigate } from "react-router-dom";
import s from './Header.module.css';
import { useState } from "react";
const Header = () => {
    const nav = useNavigate();
    const [token, setToken] = useState<string | null>(localStorage.getItem('popcornToken'));
    return (
        <>
            <header className={s.header}>
                <img className={s.logo} width={150} src="/icon/logo.png" onClick={() => nav('/')} />
                <div className={s.menuWrapper}>
                    <div className={s.menu}>
                        {
                            token ? 
                            <>
                                <button onClick={() => nav('/mypage')}>마이페이지</button>
                                <button onClick={() => {
                                    localStorage.removeItem('popcornToken');
                                    setToken(null);
                                    nav('/');
                                }}>로그아웃</button>
                            </> 
                            : 
                            <>
                                <button onClick={() => nav('/login')}>로그인</button>
                                <button onClick={() => nav('/join')}>회원가입</button>
                            </>
                        }
                    </div>
                    <div className={s.searchWrapper}>
                        <input placeholder='원하는 영화 있으세요?' />
                        <img width={30} src='/icon/search.png' />
                    </div>
                </div>
            </header>
            <div className={s.faker}></div>
        </>
    )
}

export default Header;