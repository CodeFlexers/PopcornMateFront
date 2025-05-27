import { useNavigate } from "react-router-dom";

const Logo = () => {
    const nav = useNavigate();
    return(
        <img style={{
            cursor:'pointer',
            position:'fixed',
            top:30,
            left:30
        }} width={150} src="/icon/logo.png" onClick={()=>nav('/')}/>
    )
}

export default Logo;