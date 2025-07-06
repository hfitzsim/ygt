import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Flex, Button } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

const LogoutButton = () => {
    const { logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/ygt/');
    };

    return (
        <Flex justify='flex-end'>
            <Button
                variant='white'
                onClick={handleLogout}
                leftSection={<FontAwesomeIcon icon={faPowerOff} />}
                size='xs'>
                Log out
            </Button>
        </Flex>
    );
};

export { LogoutButton };
