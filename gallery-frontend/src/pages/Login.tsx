import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/accountService.ts';

type LoginForm = {
  loginId: string;
  loginPw: string;
};

export default function Login() {
  const [form, setForm] = useState<LoginForm>({
    loginId: '',
    loginPw: '',
  });

  const navigate = useNavigate();

  const handleChange =
    (field: keyof LoginForm) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await login(form);

    switch (res?.status) {
      case 200:
        navigate('/');
        break;
      case 404:
        window.alert('입력하신 정보와 일치하는 회원이 없습니다.');
        break;
      default:
        // 기타 에러는 콘솔에만 남김
        // eslint-disable-next-line no-console
        console.error('Unexpected login response', res);
    }
  };

  return (
    <div className="login">
      <div className="container" style={{ maxWidth: 576 }}>
        <form
          className="py-5 d-flex flex-column gap-3"
          onSubmit={handleSubmit}
        >
          <h1 className="h5 mb-3">로그인</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="loginId"
              placeholder="이메일"
              value={form.loginId}
              onChange={handleChange('loginId')}
            />
            <label htmlFor="loginId">이메일</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="loginPw"
              placeholder="패스워드"
              value={form.loginPw}
              onChange={handleChange('loginPw')}
            />
            <label htmlFor="loginPw">패스워드</label>
          </div>

          <button type="submit" className="w-100 h6 btn py-3 btn-primary">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}

