import s from './MovieCard.module.css';

type MovieCardProps = {
    nav: any;
    posterPath: string;
    isNew: boolean;
};
const MovieCard = ({nav, posterPath, isNew}: MovieCardProps) => {
    const movieCode = 950387;
    return (
        <div onClick={()=>nav(`/movie/${movieCode}`)} className={s.movieCard}>
            <img className={s.poster} width={200} src={"https://image.tmdb.org/t/p/w500"+posterPath} alt="Movie Poster" />
            {isNew && <span className={s.newBadge}>New</span>}
        </div>
    );
}
export default MovieCard;