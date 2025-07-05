import { AuthForm } from './components/AuthForm';
import App from './App';
import { useUser } from './context/UserContext';

export default function Root() {
    const { user } = useUser();

    return user ? <App /> : <AuthForm />;
}
