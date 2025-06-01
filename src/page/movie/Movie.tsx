import { useState } from 'react';
import Review from '../../component/review/Review';
import s from './Movie.module.css';
import Footer from '../../component/footer/Footer';

const Movie = () => {
    const movie = {
        title: 'A Minecraft Movie',
        overview: `Four misfits find themselves struggling with ordinary problems when they are suddenly pulled through a mysterious portal into the Overworld: a bizarre, cubic wonderland that thrives on imagination. To get back home, they'll have to master this world while embarking on a magical quest with an unexpected, expert crafter, Steve.`,
        posterPath: '/dDlfjR7gllmr8HTeN6rfrYhTdwX.jpg',
        backdropPath: '/2Nti3gYAX513wvhp8IiLL6ZDyOm.jpg',
        releaseDate: '2025-03-31',
        voteAverage: 6.501,
        voteCount: 1537,
        genres: ['Family', 'Comedy', 'Adventure', 'Fantasy'],
        runtime: 120,
    }
    const [isWatched, setIsWatched] = useState(false);
    return (
        <div>
            <div className={s.movieThumbnail}>
                <img className={s.backdropPath} src={"https://image.tmdb.org/t/p/w780" + movie.backdropPath} alt={movie.title} />
                <div className={s.gradient}>
                    <h1>{movie.title}</h1>
                    <div className={s.movieInfo}>
                        <div>상영시간 : {movie.runtime}분</div>
                        <div>·</div>
                        <div>개봉 : {movie.releaseDate}</div>
                        <div>·</div>
                        <div>평점 : {movie.voteAverage}</div>
                        <div>·</div>
                        {movie.genres.map((genre, index) => (
                            <div key={index}>{genre},</div>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <div className={s.reactionButtons}>
                    {!isWatched ?
                        <button onClick={() => setIsWatched(true)}>이미 시청했나요?</button>
                        :
                        <div className={s.watchedFeedback}>
                            <h3>영화가 어땟는지 알려주세요.</h3>
                            <div style={{ display: 'flex', gap: '10px' }}>
                            <button>맘에들어요! 👍 </button>
                            <button>별로에요 👎 </button>
                            <button onClick={() => setIsWatched(false)}>안알려줄래요..😢</button>
                            </div>
                        </div>
                    }
                </div>
                <div className={s.overview}>
                    <h2>줄거리</h2>
                    <p>{movie.overview}</p>
                </div>
            </div>
            <section>
                <Review/>
            </section>
            <Footer/>
        </div>
    );
}

export default Movie;