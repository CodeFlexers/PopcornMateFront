export type ReviewDto = {
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
export type ReviewComment = {
    reviewCommentCode: number;
    content: string;
    wroteAt: [number, number, number, number, number, number]; // [year, month, day, hour, minute, second]
    userNickname: string;
    profileImage: string;
    reviewCode: number;
    isEdit: boolean;
}