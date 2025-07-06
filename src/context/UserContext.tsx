import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react';
import supabase from '../supabaseClient.ts';
import type { User } from '@supabase/supabase-js';

interface UserContextType {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };
        getUser();

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
                setLoading(false);
            },
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error('Logout error:', error);
        setUser(null); // Optional, since auth listener will handle this too
    };

    return (
        <UserContext.Provider value={{ user, loading, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook for consuming user context
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
