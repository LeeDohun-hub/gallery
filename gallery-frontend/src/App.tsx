import './App.css';
import { useCallback, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { useAccountStore } from './stores/account';

function App() {
  const { state } = useAccountStore();
  const location = useLocation();

  const checkAccount = useCallback(async () => {
    // 추후 구현
    // state 값을 사용해 로그인 여부를 확인하거나 갱신할 수 있습니다.
    void state;
  }, [state]);

  useEffect(() => {
    void checkAccount();
  }, [checkAccount, location.pathname]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;


