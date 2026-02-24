import { createContext, useContext, useMemo, useState, ReactNode } from 'react'

type AccountState = {
  // extend as needed (e.g., id, name, roles)
}

type AccountContextValue = {
  state: AccountState
  setState: (next: AccountState) => void
}

const AccountContext = createContext<AccountContextValue | null>(null)

export function AccountProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AccountState>({})

  const value = useMemo(() => ({ state, setState }), [state])

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  )
}

export function useAccountStore() {
  const ctx = useContext(AccountContext)
  if (!ctx) {
    throw new Error('useAccountStore must be used within an AccountProvider')
  }
  return ctx
}


