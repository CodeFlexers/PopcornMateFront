import { motion } from 'framer-motion';
import Header from '../../component/logo/Header';
import MovieList from '../../component/movieList/MovieList';
import Footer from '../../component/footer/Footer';
import { useEffect, useState } from 'react';
import s from './Home.module.css';
import api from '../../common/axios';

const Home = () => {
    const [isLogin, setIsLogin] = useState(localStorage.getItem('popcornToken') ? true : false);
    const [popMovie, setPopMovie] = useState([]);
    const [newMovie, setNewMovie] = useState([]);
    const getPopMovie = async () => {
        const res = await api.get('/movies/pop');
        if (res.status === 200) {
            console.log(res.data);

            setPopMovie(res.data);
        } else {
            console.error('Failed to fetch popular movies');
        }
    }
    const getNewMovie = async () => {
        const res = await api.get('/movies/new');
        if (res.status === 200) {
            console.log(res.data);
            setNewMovie(res.data);
        } else {
            console.error('Failed to fetch new movies');
        }
    }
    useEffect(() => {
        getPopMovie();
        getNewMovie();
    }, []);
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
                    <MovieList title="추천하는 영화" movies={popMovie} />

                    {
                        !isLogin &&
                        <section className={s.loginSection}>
                            <h2 style={{ fontSize: '1.5em' }}>로그인을 해야하는 이유</h2>
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
                    <MovieList title="개봉 예정, 신작 영화" movies={newMovie} />
                    <MovieList title="인기 영화" movies={popMovie} />
                </div>

            </motion.div>
            <Footer />
        </>
    )
}

export default Home;