import { useState } from 'react';
import supabase from '../supabaseClient';
import { useForm, isEmail } from '@mantine/form';
import {
    Container,
    Title,
    TextInput,
    PasswordInput,
    Button,
    Stack,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const AuthForm = () => {
    const [visible, { toggle }] = useDisclosure(false);
    const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');

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

    const handleSubmit = async () => {
        console.log('handleSubmit called');
        if (form.validate().hasErrors) {
            console.log('Form validation errors:', form.errors);
        }

        const creds = {
            email: form.getValues().email,
            password: form.getValues().password,
        };

        const { data, error } =
            mode === 'signUp'
                ? await supabase.auth.signUp(creds)
                : await supabase.auth.signInWithPassword(creds);

        if (error) {
            console.error(error);
        } else {
            console.log(data);
            alert(
                `Signed ${mode === 'signUp' ? 'up' : 'in'} as ${form.getValues().email}.
                ${mode === 'signUp' ? 'Check your email for a verification link.' : 'Welcome back!'}`,
            );
        }
    };

    const toggleMode = () => {
        if (mode === 'signIn') {
            setMode('signUp');
        } else {
            setMode('signIn');
        }
    };

    return (
        <Container>
            <Stack>
                <Title>{mode === 'signUp' ? 'Sign Up' : 'Sign In'}</Title>
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
                />
                {mode === 'signUp' && (
                    <PasswordInput
                        label='Confirm Password'
                        {...form.getInputProps('verifyPassword')}
                        key={form.key('verifyPassword')}
                        visible={visible}
                        onVisibilityChange={toggle}
                    />
                )}
                <Button onClick={handleSubmit}>
                    {mode === 'signUp' ? 'Sign Up' : 'Sign In'}
                </Button>
                <Button variant='transparent' onClick={toggleMode}>
                    {mode === 'signIn' ? 'Sign Up' : 'Sign In'}
                </Button>
            </Stack>
        </Container>
    );
};

export { AuthForm };
