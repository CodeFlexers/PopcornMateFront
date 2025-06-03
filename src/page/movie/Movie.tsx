import { useEffect, useRef, useState } from 'react';
import s from './Movie.module.css';
import Footer from '../../component/footer/Footer';
import ReviewContainer from '../../component/review/ReviewContainer';
import Header from '../../component/logo/Header';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import api from '../../common/axios';
type Movie = {
    title: string;
    overview: string;
    posterPath: string;
    backdropPath: string;
    releaseDate: [number, number, number];
    voteAverage: number;
    voteCount: number;
    genres: string[];
    runtime: number;
}
const Movie = () => {
    const { id } = useParams();
    const [isLogin, setIsLogin] = useState(localStorage.getItem('popcornToken') ? true : false);
    const [isWatched, setIsWatched] = useState(false);
    const [movie, setMovie] = useState<Movie>();
    const [time, setTime] = useState(0);
    const timeRef = useRef(0);
    const getMovie = async () => {
        const res = await api.get(`/movies?movieCode=${id}`);
        setMovie(res.data);
    }
    const likeMovie = async (e:any) => {
        const reaction = e.target.name
        await api.post(`/recommendation/${id}/like?likeScore=${reaction==='like'?4:-5}`);
        setIsWatched(false);
    }
    useEffect(() => {
        getMovie();
        const interval = setInterval(() => {
            setTime((prev) => {
                timeRef.current = prev + 1;
                return prev + 1;
            });
        }, 1000);

        return () => {
            clearInterval(interval);
            const f = new FormData();
            f.append('time', timeRef.current.toString());
            api.post(`/movies/${id}/enter`, f)
        };
    }, []);
    return (
        <>
            <Header />
            <motion.div
                initial={{ x: 0, opacity: 1, scale: 0 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: 0, opacity: 1, scale: 0 }}
            >
                <div>
                    <div className={s.movieThumbnail}>
                        <img className={s.backdropPath} src={"https://image.tmdb.org/t/p/w780" + movie?.backdropPath} alt={movie?.title} />
                        <div className={s.gradient}>
                            <h1>{movie?.title}</h1>
                            <div className={s.movieInfo}>
                                {/* <div>상영시간 : {movie?.runtime}분</div>
                        <div>·</div> */}
                                <div>개봉 : {movie?.releaseDate[0] + "-" + movie?.releaseDate[1] + "-" + movie?.releaseDate[2]}</div>
                                <div>·</div>
                                <div>평점 : {movie?.voteAverage?.toFixed(1)}</div>
                                <div>·</div>
                                {movie?.genres.map((genre, index) => (
                                    <div key={index}>{genre} {index + 1 === movie.genres.length ? "" : ","}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={s.reactionButtons}>
                            {!isWatched ? isLogin ?
                                <button onClick={() => setIsWatched(true)}>이미 시청했나요?</button> : <></>
                                :
                                <div className={s.watchedFeedback}>
                                    <h3>영화가 어땟는지 알려주세요.</h3>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button name='like' onClick={likeMovie}>맘에들어요! 👍 </button>
                                        <button name='dislike'onClick={likeMovie}>별로에요 👎 </button>
                                        <button onClick={() => setIsWatched(false)}>안알려줄래요..😢</button>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className={s.overview}>
                            <h2>줄거리</h2>
                            <p>{movie?.overview === '' ? '줄거리가 아직 등록되지 않았어요. 😢' : movie?.overview}</p>
                        </div>
                    </div>
                    <ReviewContainer />
                    <Footer />
                </div>
            </motion.div>
        </>
    );
}

export default Movie;