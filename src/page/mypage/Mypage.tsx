import { useParams } from "react-router-dom";
import Header from "../../component/logo/Header";
import { useEffect, useState } from "react";
import api from "../../common/axios";
import styles from './Mypage.module.css';

type User = {
    userCode: number;
    id: string;
    email: string;
    nickname: string;
    profileImage: string;
}

const Mypage = () => {
    const { code } = useParams();
    const [user, setUser] = useState<User | null>(null);
    const [msg, setMsg] = useState('Loading...');
    const [nickname, setNickname] = useState(user?.nickname || '');
    const [email, setEmail] = useState(user?.email || '');
    const getUser = async () => {
        try {
            const res = await api.get(`/users/${code}`);
            setUser(res.data);
            setNickname(res.data.nickname);
            setEmail(res.data.email);
        } catch (err) {
            console.error('Error fetching user data:', err);
            setMsg('Failed to load user data.');
        }
    }
    useEffect(() => {
        getUser();
    }, [])
    const handleSave = () => {
        console.log('수정된 정보 저장:', { nickname, email });
    };
    const activity = {
        reviewCount: 3,
        commentCount: 13,
        likedCount: 2,
    };
    return (
        <>
        <Header/>
        <div className={styles.pageContainer}>
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>프로필 정보</h2>
                <img src={user?.profileImage} onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = '/icon/default_profile.png';
                        }}  alt="프로필" className={styles.profileImage} />
                <div className={styles.inputGroup}>
                    <label className={styles.label}>닉네임</label>
                    <input
                        className={styles.input}
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>이메일</label>
                    <input
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button className={styles.saveButton} onClick={handleSave}>정보 저장</button>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>활동 정보</h2>
                <div className={styles.activityBox}>
                    <div className={styles.activityItem}>
                        <span className={styles.label}>작성한 리뷰</span>
                        <span>{activity.reviewCount}개</span>
                    </div>
                    <div className={styles.activityItem}>
                        <span className={styles.label}>작성한 댓글</span>
                        <span>{activity.commentCount}개</span>
                    </div>
                    <div className={styles.activityItem}>
                        <span className={styles.label}>좋아요 누른 리뷰</span>
                        <span>{activity.likedCount}개</span>
                    </div>
                </div>
            </section>
        </div>
        </>
    );
}

export default Mypage;