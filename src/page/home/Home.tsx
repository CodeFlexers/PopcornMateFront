import { motion } from 'framer-motion';
import Header from '../../component/logo/Header';
import MovieList from '../../component/movieList/MovieList';
import Footer from '../../component/footer/Footer';
import { useState } from 'react';
import s from './Home.module.css';

const Home = () => {
    const [isLogin, setIsLogin] = useState(localStorage.getItem('popcornToken') ? true : false);
    return (
        <>
            <Header />
            <motion.div
                initial={{ x: 0, opacity: 1, scale: 0 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: 0, opacity: 1, scale: 0 }}
                transition={{
                    duration: 0.3,
                    ease: 'easeOut'
                }}>
                <div>
                    <MovieList title="추천하는 영화" />
                    {
                        !isLogin &&
                        <section className={s.loginSection}>
                            <h2 style={{fontSize:'1.5em'}}>로그인을 해야하는 이유</h2>
                            <div className={s.loginContent}>
                                <div>
                                    <p>개인 맞춤형 추천을 받아보세요.</p>
                                </div>
                                <div>
                                    <p>활동에 따라 영화를 추천받아보세요.</p>
                                </div>
                                <div>
                                    <p>통계를 보고 취향을 알아보세요.</p>
                                </div>
                                <div>
                                    <p>리뷰를 작성하여 영화에 대한 의견을 나눠보세요.</p>
                                </div>
                            </div>
                        </section>
                    }
                    <MovieList title="신작 영화" />
                    <MovieList title="인기 영화" />
                </div>

            </motion.div>
            <Footer />
        </>
    )
}

export default Home;