import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
});

// 🔹 요청 인터셉터 (토큰 추가 등)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("popcornToken");
    if (token) {
      config.headers.Authorization = `${token}`;
    } else {
        config.headers.Authorization = 'GodToken';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🔹 응답 인터셉터 (에러 공통 처리 등)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      alert("로그인이 필요합니다.");
      // location.href = "/login"; // 또는 로그인 페이지 이동
    }
    return Promise.reject(error);
  }
);

export default api;
