import { useNavigate } from "react-router-dom";
import MovieCard from "../movie_card/MovieCard";
import { useRef } from "react";
import s from './MovieList.module.css';
type MovieListProps = {
    title: string;
}
const MovieList = ({title}: MovieListProps) => {
    const nav = useNavigate();
    const recommendMovieRef = useRef(null);

    const scrollRight = () => {
        if (recommendMovieRef.current) {
            const container = recommendMovieRef.current as HTMLDivElement;
            container.scrollBy({
                left: container.offsetWidth,
                behavior: 'smooth'
            });
        }
    }
    return (
        <div className={s.recommendMovie}>
            <div className={s.title}>{title}</div>
            <div className={s.movieList} ref={recommendMovieRef}>
                <MovieCard nav={nav} posterPath='/dDlfjR7gllmr8HTeN6rfrYhTdwX.jpg' isNew={true} />
                <MovieCard nav={nav} posterPath='/oLxWocqheC8XbXbxqJ3x422j9PW.jpg' isNew={false} />
                <MovieCard nav={nav} posterPath='/oLxWocqheC8XbXbxqJ3x422j9PW.jpg' isNew={false} />
                <MovieCard nav={nav} posterPath='/oLxWocqheC8XbXbxqJ3x422j9PW.jpg' isNew={false} />
                <MovieCard nav={nav} posterPath='/oLxWocqheC8XbXbxqJ3x422j9PW.jpg' isNew={false} />
                <MovieCard nav={nav} posterPath='/oLxWocqheC8XbXbxqJ3x422j9PW.jpg' isNew={false} />
                <MovieCard nav={nav} posterPath='/oLxWocqheC8XbXbxqJ3x422j9PW.jpg' isNew={false} />
                <MovieCard nav={nav} posterPath='/oLxWocqheC8XbXbxqJ3x422j9PW.jpg' isNew={false} />
            </div>
            <button onClick={scrollRight} className={s.nextButton}>{">"}</button>
        </div>
    );
}

export default MovieList;