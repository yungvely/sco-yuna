// pages/api/admin-auth.js

export default function handler(req, res) {
  // POST 요청이 아니면 거부
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // 클라이언트에서 보낸 비밀번호
  const { password } = req.body;

  // .env 파일에 저장된 실제 비밀번호 (서버에서만 접근 가능)
  const realPassword = process.env.ADMIN_PASSWORD;

  // 비밀번호 비교
  if (password === realPassword) {
    // 성공 시 200 OK 응답
    res.status(200).json({ success: true });
  } else {
    // 실패 시 401 Unauthorized 응답
    res.status(401).json({ success: false });
  }
}
