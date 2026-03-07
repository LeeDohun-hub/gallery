import './App.css';
import { useCallback, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { useAccountStore } from './stores/account.tsx';
import { check } from './services/accountService.ts';

function App() {
  const { state, setState } = useAccountStore();
  const location = useLocation();

  const checkAccount = useCallback(async () => {
    const res = await check();

    if (res.status === 200) {
      setState({
        ...state,
        checked: true,
        loggedIn: res.data === true,
      });
    } else {
      setState({
        ...state,
        checked: false,
        loggedIn: false,
      });
    }
  }, [state, setState]);

  useEffect(() => {
    void checkAccount();
  }, [checkAccount, location.pathname]);

  // 로그인 체크 여부 확인 후 출력
  if (!state.checked) {
    return null;
  }

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


