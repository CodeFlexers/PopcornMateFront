import { useInView } from 'react-intersection-observer';
import Review from './review/Review';
import s from './ReviewContainer.module.css';
import { useEffect, useState } from 'react';
import type { ReviewDto } from './reviewType';
import api from '../../common/axios';
import { useNavigate, useParams } from 'react-router-dom';


const ReviewContainer = () => {
  const nav = useNavigate();
  const {id} = useParams();
  const [isLogin, setIsLogin] = useState(localStorage.getItem('popcornToken') ? true : false);
  const {ref, inView} = useInView({threshold: 0.5});
  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const [pageObject, setPageObject] = useState({page:0, first:false, last:false, totalElements:0, totalPages:0});
  const fetchReviews = async () => {
    try{
      if(pageObject.last) return;
      const res = await api.get(`/reviews?movieCode=${id}&sort=new_desc&page=${pageObject.page}`);
      console.log(res);
      setReviews(prevReviews => [...prevReviews, ...res.data.content]);
      setPageObject(p => ({...p, page: p.page + 1, first: res.data.first, last: res.data.last, totalElements: res.data.totalElements, totalPages: res.data.totalPages}));
    } catch(err) {
      console.error('리뷰를 불러오는 중 오류 발생:', err);
    }
  }
  const setReviewsFromReviewReaction = (review: ReviewDto, response:string) => {
    setReviews(prevReviews => {
      return prevReviews.map(r => {
        if(r.reviewCode === review.reviewCode) {
          const updatedReview = {...r};
          if(response === 'like') {
            updatedReview.likeCount += 1;
          } else if(response === 'dislike') {
            updatedReview.dislikeCount += 1;
          } else if(response === 'delete_like') {
            updatedReview.likeCount -= 1;
          } else if(response === 'delete_dislike') {
            updatedReview.dislikeCount -= 1;
          } else if(response === 'change_like') {
            updatedReview.likeCount -= 1;
            updatedReview.dislikeCount += 1;
          } else if(response === 'change_dislike') {
            updatedReview.likeCount += 1;
            updatedReview.dislikeCount -= 1;
          }          
          return updatedReview;
        }
        return r;
      });
    });
  }
    
  useEffect(()=>{
    if(inView){
      
      fetchReviews();
    }
  },[inView]);
  return (
    <div className={s.reviewContainer}>
      <h1>영화 리뷰</h1>
      <div className={s.reviewWriteContainer}>
        {
          isLogin && <><button onClick={() => nav(`/review/write/${id}`)}>리뷰 작성하기</button>
        </>
        }
        
      </div>
      <div className={s.reviewList}>
        {
          reviews.length === 0 ?
          <div className={s.noReviews}>아직 리뷰가 없습니다. 첫 리뷰를 남겨주세요!</div>
          :
          reviews.map((review) => (
            <Review key={review.reviewCode} review={review} setReaction={setReviewsFromReviewReaction}/>
          ))
        }
        <div ref={ref} className='reviewTrigger'></div>
      </div>
    </div>
  );
}

export default ReviewContainer;