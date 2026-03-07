import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

type AccountState = {
  id?: string;
  name?: string;
  checked: boolean;
  loggedIn: boolean | null;
};

type AccountContextValue = {
  state: AccountState;
  setState: (next: AccountState) => void;
};

const AccountContext = createContext<AccountContextValue | null>(null);

export function AccountProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AccountState>({
    checked: false,
    loggedIn: null,
  });

  const value = useMemo(() => ({ state, setState }), [state]);

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAccountStore() {
  const ctx = useContext(AccountContext);
  if (!ctx) {
    throw new Error('useAccountStore must be used within an AccountProvider');
  }
  return ctx;
}




