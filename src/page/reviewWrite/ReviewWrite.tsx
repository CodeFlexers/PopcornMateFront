import { useState } from "react";
import s from './ReviewWrite.module.css';
import { useNavigate, useParams } from "react-router-dom";
import api from "../../common/axios";

const ReviewWrite = () => {
    const [rate, setRate] = useState(0);
    const [content, setContent] = useState('');
    const { id } = useParams<{ id: string }>();
    const nav = useNavigate();
    const writeReview = async () => {
        if (rate === 0 || content.trim() === '') {
            return;
        }
        const form = new FormData();
        form.append('rate', rate.toString());
        form.append('content', content);
        form.append('movieCode', id!);
        try {
            const res = await api.post('/reviews', form);
            if (res.status === 200) {
                nav(`/movie/${id}`);
            }
        } catch (err: any) {
            if (err.response.status === 400) {
                alert('리뷰 작성에 실패했습니다. 다시 시도해주세요.');
            } else {
                console.error(err);
                alert('알 수 없는 오류가 발생했습니다. 나중에 다시 시도해주세요.');
            }
        }
    }
    return (
        <div className={s.page}>
            <h2 className={s.title}>리뷰 작성</h2>

            <div className={s.rateSection}>
                {[1, 2, 3, 4, 5].map((i) => (
                    <span
                        key={i}
                        className={i <= rate ? s.starFilled : s.starEmpty}
                        onClick={() => setRate(i)}
                    >
                        ★
                    </span>
                ))}
            </div>

            <textarea
                className={s.textarea}
                placeholder="이 영화에 대한 솔직한 감상을 남겨주세요!"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <button
                className={s.submitButton}
                disabled={rate === 0 || content.trim() === ''}
                onClick={writeReview}
            >
                리뷰 등록
            </button>
        </div>
    );
}
export default ReviewWrite;