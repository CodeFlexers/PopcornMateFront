import api from "../../../common/axios";
import { formatTime } from "../../../common/function";
import type { ReviewDto } from "../reviewType";
import s from "./Review.module.css";
import { useNavigate } from "react-router-dom";

type ReviewProps = {
    review: ReviewDto;
    setReaction: (review: ReviewDto, response: string) => void;
}
const Review = ({ review, setReaction }: ReviewProps) => {
    const nav = useNavigate();
    const reactionReview = async (reviewCode: number, reactionType: 'like' | 'dislike') => {
        try {
            const form = new FormData();
            form.append('reaction', reactionType);
            const res = await api.post(`/reviews/reactions/${reviewCode}`, form);
            setReaction(review, res.data);
        } catch (error: any) {
            if(error.response.status===400){
                alert('자신의 리뷰는 좋아요/싫어요를 할 수 없습니다.');
            }
        }
    };
    return (
        <div className={s.reviewCard}>
            <div onClick={()=>nav(`/review/detail/${review.reviewCode}`,{state:review})} className={s.reviewHeader}>
                <img src={review.profileImage} onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/icon/default_profile.png';
                }} alt="user" className={s.profileImage} />
                <div className={s.userInfo}>
                    <div className={s.userLine}>
                        <span className={s.username}>{review.userNickname}</span>
                        {review.isEdit && <span className={s.edited}>(수정됨)</span>}
                    </div>
                    <span className={s.reviewDate}>{formatTime(review.wroteAt)}</span>
                    <div className={s.reviewRate}>{'⭐'.repeat(review.rate)}</div>
                </div>
            </div>

            <div onClick={()=>nav(`/review/detail/${review.reviewCode}`,{state:review})} className={s.reviewText}>{review.content}</div>

            <div className={s.reviewFooter}>
                <div onClick={()=>nav(`/review/detail/${review.reviewCode}`,{state:review})} className={s.footerItem}>
                    <span>💬</span>
                    <span>{review.commentCount}</span>
                </div>
                <div onClick={() => { reactionReview(review.reviewCode, 'like') }} className={s.footerItem}>
                    <span>👍</span>
                    <span>{review.likeCount}</span>
                </div>
                <div onClick={() => { reactionReview(review.reviewCode, 'dislike') }} className={s.footerItem}>
                    <span>👎</span>
                    <span>{review.dislikeCount}</span>
                </div>
            </div>
        </div>
    )
}

export default Review;