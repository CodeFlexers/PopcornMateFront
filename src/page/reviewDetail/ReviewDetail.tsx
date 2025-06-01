import { useLocation } from "react-router-dom";
import { formatTime } from "../../common/function";
import Header from "../../component/logo/Header";
import api from "../../common/axios";
import { useEffect, useState } from "react";
import s from './ReviewDetail.module.css';
import { useInView } from "react-intersection-observer";
import type { ReviewComment } from "../../component/review/reviewType";
import Comment from "../../component/comment/Comment";
import Footer from "../../component/footer/Footer";
type Review = {
    reviewCode: number;
    content: string;
    rate: number;
    wroteAt: [number, number, number, number, number, number]; // [year, month, day, hour, minute, second]
    movieCode: number;
    userNickname: string;
    profileImage: string;
    commentCount: number;
    likeCount: number;
    dislikeCount: number;
    isEdit: boolean;
}

const ReviewDetail = () => {
    const location = useLocation();
    const { ref, inView } = useInView({ threshold: 1.0 });
    const [pageObject, setPageObject] = useState({ page: 0, first: false, last: false, totalElements: 0, totalPages: 0, empty: false });
    const reviewLocation = location.state as any;
    const [review, setReview] = useState<Review>(reviewLocation);
    const [reviewComments, setReviewComments] = useState<ReviewComment[]>([]);
    const [comment, setComment] = useState('');
    const reactionReview = async (reviewCode: number, reactionType: 'like' | 'dislike') => {
        try {
            const form = new FormData();
            form.append('reaction', reactionType);
            const res = await api.post(`/reviews/reactions/${reviewCode}`, form);
            setReaction(res.data);
        } catch (error: any) {
            if (error.response.status === 400) {
                alert('자신의 리뷰는 좋아요/싫어요를 할 수 없습니다.');
            }
        }
    };
    const getReactionComment = async () => {
        if (pageObject.last) return;
        const res = await api.get(`/reviews/${review.reviewCode}/comments?page=${pageObject.page}`);
        console.log(res);
        if (res.data.empty) {
            console.log('댓글 없음');
        } else {
            setPageObject(p => ({ ...p, page: p.page + 1, first: res.data.first, last: res.data.last, totalElements: res.data.totalElements, totalPages: res.data.totalPages }));
            setReviewComments(prevComments => [...prevComments, ...res.data.content]);
        }
    }
    const writeComment = async () => {
        if (comment.trim() === '') {
            alert('댓글을 입력해주세요.');
            return;
        }
        const form = new FormData();
        form.append('content', comment);
        const res = await api.post(`/reviews/${review.reviewCode}/comments`, form);
        //첫 번째 인덱스에 추가
        setReviewComments(prevComments => [res.data, ...prevComments]);
        setComment('');
    }
    useEffect(() => {
        if (inView) {
            getReactionComment();
        }
    }, [inView]);
    const setReaction = (response: string) => {
        setReview(prevReview => {
            const updatedReview = { ...prevReview };
            if (response === 'like') {
                updatedReview.likeCount += 1;
            } else if (response === 'dislike') {
                updatedReview.dislikeCount += 1;
            } else if (response === 'delete_like') {
                updatedReview.likeCount -= 1;
            } else if (response === 'delete_dislike') {
                updatedReview.dislikeCount -= 1;
            } else if (response === 'change_like') {
                updatedReview.likeCount -= 1;
                updatedReview.dislikeCount += 1;
            } else if (response === 'change_dislike') {
                updatedReview.likeCount += 1;
                updatedReview.dislikeCount -= 1;
            }
            return updatedReview;
        });
    }
    return (
        <>
            <Header />
            {review &&
                <div className={s.reviewCard}>
                    <div className={s.reviewHeader}>
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

                    <div className={s.reviewText}>{review.content}</div>

                    <div className={s.reviewFooter}>
                        <div onClick={() => { reactionReview(review.reviewCode, 'like') }} className={s.footerItem}>
                            <span>👍</span>
                            <span>{review.likeCount}</span>
                        </div>
                        <div onClick={() => { reactionReview(review.reviewCode, 'dislike') }} className={s.footerItem}>
                            <span>👎</span>
                            <span>{review.dislikeCount}</span>
                        </div>
                    </div>
                    <section>
                        <h2>댓글</h2>
                        <div className={s.commentForm}>
                            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="댓글을 입력하세요." className={s.textarea}></textarea>
                            <button onClick={writeComment} className={s.submitButton}>댓글 남기기</button>
                        </div>
                        {
                            reviewComments.length === 0 ?
                                <div className={s.noComments}>아직 댓글이 없습니다. 첫 댓글을 남겨주세요!</div>
                                :
                                reviewComments.map((comment) => (<Comment key={comment.reviewCommentCode} comment={comment} />))
                        }
                        <div ref={ref}></div>
                    </section>
                </div>
            }
            <Footer />
        </>
    );
}

export default ReviewDetail;