// UserContext.tsx
import React, { createContext, useState, type ReactNode } from "react";

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface UserContextType {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    selectedUser: User | null;
    setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ users, setUsers, selectedUser, setSelectedUser }}>
            {children}
        </UserContext.Provider>
    );
};