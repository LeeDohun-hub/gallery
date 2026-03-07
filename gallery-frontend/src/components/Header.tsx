import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { useAccountStore } from '../stores/account.tsx';
import { logout } from '../services/accountService.ts';

const Header = () => {
  // 계정 스토어
  const { state, setState } = useAccountStore();
  
  // 라우터 객체
  const navigate = useNavigate();
  
  // 로그아웃 핸들러
  const logoutAccount = async () => {
    const res = await logout();
    if (res.status === 200) {
      setState({
        ...state,
        loggedIn: false,
      });
      navigate('/');
    }
  };
  return (
    <header>
      <div className="navbar navbar-dark bg-dark text-white shadow-sm">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <strong>Gallery</strong>
          </Link>
          <div className="menus d-flex gap-3">
            {!state.loggedIn ? (
              <>
                <Link to="/login">로그인</Link>
                <Link to="/join">회원가입</Link>
              </>
            ) : (
              <>
                <a onClick={logoutAccount}>로그아웃</a>
                <Link to="/orders">주문 내역</Link>
                <Link to="/cart">장바구니</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

