import { AuthForm } from './components/AuthForm';
import App from './App';
import { useUser } from './context/UserContext';
import { LogoutButton } from './components/LogoutButton';

export default function Root() {
    const { user } = useUser();

    return (
        <>
            {user && <LogoutButton />}
            {user ? <App /> : <AuthForm />}
        </>
    );
}
