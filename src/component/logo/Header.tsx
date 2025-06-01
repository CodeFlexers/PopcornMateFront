import { useNavigate } from "react-router-dom";
import s from './Header.module.css';
const Header = () => {
    const nav = useNavigate();
    return (
        <>
            <header className={s.header}>
                <img className={s.logo} width={150} src="/icon/logo.png" onClick={() => nav('/')} />
                <div className={s.menuWrapper}>
                    <div className={s.menu}>
                        <button onClick={()=>nav('/login')}>로그인</button>
                        <button onClick={()=>nav('/join')}>회원가입</button>
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