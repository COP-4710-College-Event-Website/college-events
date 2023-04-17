import { createContext, useContext, useState } from 'react';

interface UserContextState {
    user_ID: string;
    setUser_ID: (user_ID: string) => void;
}

interface UserContextProviderProps {
    children: React.ReactNode;
}

const UserContext = createContext<UserContextState | undefined>(undefined);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserContextProvider');
    }
    return context;
};

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [user_ID, setUser_ID] = useState('');

    return (
        <UserContext.Provider value={{ user_ID, setUser_ID }}>
            {children}
        </UserContext.Provider>
    );
};
