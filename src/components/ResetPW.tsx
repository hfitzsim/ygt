import { useState, useEffect } from 'react';
import {
    Container,
    Title,
    PasswordInput,
    Button,
    Stack,
    Notification,
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import supabase from '../supabaseClient';

const ResetPW = () => {
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState<{
        message: string;
        type: 'success' | 'error';
    } | null>(null);

    useEffect(() => {
        const hash = window.location.hash;
        const token = new URLSearchParams(hash.substring(1)).get(
            'access_token',
        );
        if (token) {
            supabase.auth.setSession({
                access_token: token,
                refresh_token: '',
            });
        }
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setNotification(null);

        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (error) {
            setNotification({ message: error.message, type: 'error' });
        } else {
            setNotification({
                message: 'Password updated successfully!',
                type: 'success',
            });
        }

        setLoading(false);
    }
    return (
        <Container size='xs' pt='xl'>
            <Title order={2} mb='md'>
                Reset Your Password
            </Title>
            <form onSubmit={handleSubmit}>
                <Stack>
                    <PasswordInput
                        label='New Password'
                        placeholder='Enter a new password'
                        value={newPassword}
                        onChange={e => setNewPassword(e.currentTarget.value)}
                        required
                    />
                    <Button type='submit' loading={loading}>
                        Update Password
                    </Button>
                    {notification && (
                        <Notification
                            icon={
                                notification.type === 'success' ? (
                                    <FontAwesomeIcon icon={faCheck} />
                                ) : (
                                    <FontAwesomeIcon icon={faXmark} />
                                )
                            }
                            color={
                                notification.type === 'success'
                                    ? 'green'
                                    : 'red'
                            }
                            title={
                                notification.type === 'success'
                                    ? 'Success'
                                    : 'Error'
                            }
                            withCloseButton={false}>
                            {notification.message}
                        </Notification>
                    )}
                </Stack>
            </form>
        </Container>
    );
};

export default ResetPW;
