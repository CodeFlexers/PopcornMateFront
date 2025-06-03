import { useNavigate } from "react-router-dom";
import s from './Header.module.css';
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
type User = {
    accountCode: number;
    accountId: string;
    nickname: string;
    accountRole: string;
}

const Header = () => {
    const nav = useNavigate();
    const [token, setToken] = useState<string | null>(localStorage.getItem('popcornToken'));
    const [user, setUser] = useState<User | null>();
    useEffect(()=>{
        if(token){            
            setUser(jwtDecode(token) as User);
        }
    },[token])
    return (
        <>
            <header className={s.header}>
                <img className={s.logo} width={150} src="/icon/logo.png" onClick={() => nav('/')} />
                <div className={s.menuWrapper}>
                    <div className={s.menu}>
                        {
                            token ? <>
                                <button onClick={() => nav(`/user/${user?.accountCode}`)}>마이페이지</button>
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