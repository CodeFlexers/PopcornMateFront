import { useNavigate } from "react-router-dom";
import MovieCard from "../movie_card/MovieCard";
import { useRef } from "react";
import s from './MovieList.module.css';
type MovieListProps = {
    title: string;
    movies: { movieCode:number, poster: string, new:boolean, adult:boolean;}[];
}
const MovieList = ({title, movies}: MovieListProps) => {
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
                {
                    movies.map((movie) => (
                        <MovieCard key={movie.movieCode} isAdult={movie.adult} nav={nav} posterPath={movie.poster} isNew={movie.new} movieCode={movie.movieCode} />
                    ))
                }
            </div>
            <button onClick={scrollRight} className={s.nextButton}>{">"}</button>
        </div>
    );
}

export default MovieList;