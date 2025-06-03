import s from './MovieCard.module.css';

type MovieCardProps = {
    movieCode: number;
    nav: any;
    posterPath: string;
    isNew: boolean;
    isAdult: boolean;
};
const MovieCard = ({nav, posterPath, isNew, isAdult, movieCode}: MovieCardProps) => {
    return (
        <div onClick={()=>nav(`/movie/${movieCode}`)} className={s.movieCard}>
            <img className={s.poster} width={200} src={"https://image.tmdb.org/t/p/w500"+posterPath} alt="Movie Poster" />
            {isNew && <span className={s.newBadge}>New</span>}
        </div>
    );
}
export default MovieCard;