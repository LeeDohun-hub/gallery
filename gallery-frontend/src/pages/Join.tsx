import { type FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { join } from '../services/accountService.ts';
import { getStatus } from '../utils/http.ts';

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

  const nameRef = useRef<HTMLInputElement | null>(null);
  const loginIdRef = useRef<HTMLInputElement | null>(null);
  const loginPwRef = useRef<HTMLInputElement | null>(null);
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

    if (!form.name.trim()) {
      window.alert('이름을 입력해주세요.');
      nameRef.current?.focus();
      return;
    }

    if (!form.loginId.trim()) {
      window.alert('이메일을 입력해주세요.');
      loginIdRef.current?.focus();
      return;
    }

    if (!form.loginPw.trim()) {
      window.alert('패스워드를 입력해주세요.');
      loginPwRef.current?.focus();
      return;
    }

    const res = await join(form);
    const status = getStatus(res);

    if (status === 200) {
      window.alert('회원가입을 완료했습니다.');
      navigate('/');
    } else if (status === 409) {
      window.alert('이미 사용 중인 이메일입니다. 다른 값을 입력해주세요.');
      loginIdRef.current?.focus();
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
              ref={nameRef}
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
              ref={loginIdRef}
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
              ref={loginPwRef}
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

