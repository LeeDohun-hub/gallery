import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const isLoggedIn = false;

  const logoutAccount = () => {
    window.alert('준비 중입니다.');
  };

  return (
    <header>
      <div className="navbar navbar-dark bg-dark text-white shadow-sm">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <strong>Gallery</strong>
          </Link>
          <div className="menus d-flex gap-3">
            {!isLoggedIn ? (
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

