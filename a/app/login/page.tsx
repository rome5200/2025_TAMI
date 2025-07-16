// app/login/page.tsx
import './login.css';

export default function LoginPage() {
  return (
    <div className="login-wrapper">
      <div className="login-left">
        <img src="/images/logo.png" alt="톡미 로고" className="logo-image" />
      </div>
      <div className="login-box">
        <h1 className="login-title">의료진 로그인 화면</h1>
        <img src="/images/doctor.png" alt="의료진 이미지" className="doctor-image" />
        <input type="text" placeholder="아이디를 입력해주세요." className="login-input" />
        <input type="password" placeholder="비밀번호를 입력해주세요." className="login-input" />
        <div className="remember-me">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">로그인 상태 유지하기</label>
        </div>
        <button className="login-button">로그인</button>
      </div>
    </div>
  );
}
