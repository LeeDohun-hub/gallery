import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { join } from '../services/accountService.ts';

type JoinForm = {
  name: string;
  loginId: string;
  loginPw: string;
};

export default function Join() {
  const [form, setForm] = useState<JoinForm>({
    name: '',
    loginId: '',
    loginPw: '',
  });

  const navigate = useNavigate();

  const handleChange =
    (field: keyof JoinForm) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await join(form);

    if (res && res.status === 200) {
      // Vue 버전과 동일하게 알림 후 메인으로 이동
      window.alert('회원가입을 완료했습니다.');
      navigate('/');
    }
  };

  return (
    <div className="join">
      <div className="container" style={{ maxWidth: 576 }}>
        <form
          className="py-5 d-flex flex-column gap-3"
          onSubmit={handleSubmit}
        >
          <h1 className="h5 mb-3">회원가입</h1>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="이름"
              value={form.name}
              onChange={handleChange('name')}
            />
            <label htmlFor="name">이름</label>
          </div>

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
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}

