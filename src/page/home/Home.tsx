import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const nav = useNavigate();
    return(
        <motion.div
            initial={{x:0,opacity:1,scale:0}}
            animate={{x:0,opacity:1,scale:1}}
            exit={{x:0,opacity:1,scale:0}}
            transition={{
                duration: 0.3,
                ease:'easeOut'
            }}>
            <button onClick={()=>nav('/login')}>로그인하러 가기</button>
        </motion.div>
    )
}

export default Home;