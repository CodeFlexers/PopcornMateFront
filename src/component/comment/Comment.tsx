import { formatTime } from "../../common/function";
import type { ReviewComment } from "../review/reviewType";
import s from "./Comment.module.css";

const Comment = ({ comment }: { comment: ReviewComment }) => {
    return (
        <div className={s.commentCard}>
            <img onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = '/icon/default_profile.png';
            }} src={"http://localhost:8080/uploads/" + comment.profileImage} alt="profile" className={s.profileImage} />
            <div className={s.commentContent}>
                <div className={s.commentHeader}>
                    <span className={s.username}>{comment.userNickname}</span>
                    {comment.isEdit && <span className={s.edited}>(수정됨)</span>}
                    <span className={s.date}>{formatTime(comment.wroteAt)}</span>
                </div>
                <div className={s.text}>{comment.content}</div>
            </div>
        </div>
    );
}

export default Comment;