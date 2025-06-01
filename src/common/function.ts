export function formatTime(arr: number[]): string {
  if (arr.length < 6) return "잘못된 입력";

  const y = arr[0] | 0;
  const m = (arr[1] | 0) - 1;
  const d = arr[2] | 0;
  const h = arr[3] | 0;
  const mi = arr[4] | 0;
  const s = arr[5] | 0;
  const ms = arr.length > 6 ? ((arr[6] / 1000) | 0) : 0;

  const input = new Date(y, m, d, h, mi, s, ms).getTime();
  const now = Date.now();

  if (isNaN(input)) return "날짜 오류";
  if (now < input) return "미래 시간";

  const diff = now - input;
  const sec = (diff / 1000) | 0;
  if (sec < 60) return "방금 전";

  const min = (diff / 60000) | 0;
  if (min < 60) return `${min}분 전`;

  const hr = (diff / 3600000) | 0;
  if (hr < 12) return `${hr}시간 전`;

  const pad = (n: number) => (n < 10 ? "0" + n : "" + n);
  return (
    y + "." +
    pad(m + 1) + "." +
    pad(d) + " " +
    pad(h) + ":" +
    pad(mi)
  );
}
