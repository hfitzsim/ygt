import { useState } from 'react';
import supabase from '../supabaseClient';
import { useForm, isEmail } from '@mantine/form';
import {
    Container,
    Box,
    Title,
    TextInput,
    PasswordInput,
    Button,
    Stack,
    Text,
    LoadingOverlay,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const AuthForm = () => {
    const [visible, { toggle }] = useDisclosure(false);
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            verifyPassword: '',
        },
        validate: {
            email: isEmail('Invalid email'),
            password: value =>
                value.length < 8
                    ? 'Password should be at least 8 characters'
                    : null,
            verifyPassword: (value, values) => {
                if (mode === 'signIn') return null;
                if (value !== values.password) {
                    return 'Passwords do not match';
                }
                return null;
            },
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.validate().hasErrors) {
            console.log('Form validation errors:', form.errors);
        }

        const creds = {
            email: form.getValues().email,
            password: form.getValues().password,
        };

        const { error } =
            mode === 'signUp'
                ? await supabase.auth.signUp({
                      ...creds,
                      options: { emailRedirectTo: 'https://hfitzsim.dev/ygt/' },
                  })
                : await supabase.auth.signInWithPassword(creds);

        if (error) {
            if (error.message === 'Invalid login credentials') {
                setError('Invalid email or password');
            }
        } else {
            if (mode === 'signUp') {
                setSuccessMessage(
                    'Signed up as ' +
                        form.getValues().email +
                        '. Check your email for a verification link',
                );
                setIsLoading(true);
                setTimeout(() => {
                    setIsLoading(false);
                }, 5000);
                form.reset();
            } else {
                setSuccessMessage('Welcome back' + form.getValues().email);
                setIsLoading(true);
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
                form.reset();
            }
        }
    };

    async function requestPasswordReset(email: string) {
        setError(null);
        const { data, error } = await supabase.auth.resetPasswordForEmail(
            email,
            {
                redirectTo: 'https://hfitzsim.dev/ygt/reset-password',
            },
        );

        if (error) {
            setError('Error sending reset email:' + error.message.toString());
            return;
        }

        console.log('Password reset email sent:', data);
    }

    const toggleMode = () => {
        if (mode === 'signIn') {
            setMode('signUp');
        } else {
            setMode('signIn');
        }
    };

    return (
        <Container h={'100%'} w={'100%'}>
            <form onSubmit={handleSubmit}>
                <Box pos='relative'>
                    <LoadingOverlay
                        visible={isLoading}
                        zIndex={1000}
                        overlayProps={{ radius: 'sm', blur: 2 }}
                        loaderProps={{
                            color: 'cherry-blossom-pink',
                            children: successMessage,
                        }}
                    />
                    <Stack>
                        <Title>
                            {mode === 'signUp' ? 'Sign Up' : 'Sign In'}
                        </Title>
                        <TextInput
                            label='Email'
                            {...form.getInputProps('email')}
                            key={form.key('email')}
                        />
                        <PasswordInput
                            label='Password'
                            {...form.getInputProps('password')}
                            key={form.key('password')}
                            visible={visible}
                            onVisibilityChange={toggle}
                            mb={0}
                        />
                        {mode === 'signIn' && (
                            <Button
                                variant='transparent'
                                size='xs'
                                c='blue'
                                m={0}
                                py={0}
                                style={{ alignSelf: 'flex-end' }}
                                onClick={() =>
                                    requestPasswordReset(form.getValues().email)
                                }>
                                Forgot Password
                            </Button>
                        )}
                        {mode === 'signUp' && (
                            <PasswordInput
                                label='Confirm Password'
                                {...form.getInputProps('verifyPassword')}
                                key={form.key('verifyPassword')}
                                visible={visible}
                                onVisibilityChange={toggle}
                            />
                        )}
                        {error && (
                            <Text
                                c='red'
                                size='sm'
                                fw={600}
                                style={{ alignSelf: 'center' }}>
                                {error}
                            </Text>
                        )}
                        <Button type='submit'>
                            {mode === 'signUp' ? 'Sign Up' : 'Sign In'}
                        </Button>
                        <Button variant='transparent' onClick={toggleMode}>
                            {mode === 'signIn' ? 'Sign Up' : 'Sign In'}
                        </Button>
                    </Stack>
                </Box>
            </form>
        </Container>
    );
};

export { AuthForm };
