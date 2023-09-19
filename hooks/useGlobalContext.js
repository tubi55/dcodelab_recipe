import { createContext, useContext, useState } from 'react';
export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
	const [Theme, setTheme] = useState('theme1');
	return <GlobalContext.Provider value={{ Theme, setTheme }}>{children}</GlobalContext.Provider>;
}

export function useGlobalData() {
	const globalContext = useContext(GlobalContext);
	if (!globalContext)
		throw new Error('useGlobalData hook은 GlobalProvider컴포넌트 안에서만 호출 가능');
	return globalContext;
}
