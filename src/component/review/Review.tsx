import s from './Review.module.css';

const Review = () => {
  return (
    <div className={s.reviewContainer}>
      <h1 className={s.reviewTitle}>영화 리뷰</h1>
      <div className={s.reviewList}>
        <div className={s.review}></div>
        <div className={s.review}></div>
        <div className={s.review}></div>
        {/* ... */}
      </div>
    </div>
  );
}

export default Review;