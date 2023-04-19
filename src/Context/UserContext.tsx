import React, { createContext, useContext, useState } from 'react';

type UserRole = 'student' | 'admin' | 'superadmin';

interface UserContextValue {
    user_ID: string | null;
    setUser_ID: (user_ID: string | null) => void;
    userRole: UserRole | null;
    setUserRole: (userRole: UserRole | null) => void;
    admin_ID: number | null;
    setAdmin_ID: (admin_ID: number | null) => void;
}

const UserContext = createContext<UserContextValue>({
    user_ID: null,
    setUser_ID: () => { },
    userRole: null,
    setUserRole: () => { },
    admin_ID: null,
    setAdmin_ID: () => { }
});

export const useUserContext = () => useContext(UserContext);

interface UserContextProviderProps {
    children: React.ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
    const [user_ID, setUser_ID] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<UserRole | null>(null);
    const [admin_ID, setAdmin_ID] = useState<number | null>(null);

    return (
        <UserContext.Provider value={{ user_ID, setUser_ID, userRole, setUserRole, admin_ID, setAdmin_ID }}>
            {children}
        </UserContext.Provider>
    );
};
