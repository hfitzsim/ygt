import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { UserProvider } from './context/UserContext.tsx';

// components
import Root from './Root.tsx';
import Progress from './components/Progress.tsx';
import ResetPW from './components/ResetPW.tsx';

// styles
import theme from './styles/theme.ts';
import './index.scss';
import '@mantine/core/styles.css';

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: '/ygt',
        element: <Root />,
    },
    {
        path: '/ygt/:id',
        element: <Progress />,
    },
    {
        path: '/ygt/reset-password',
        element: <ResetPW />,
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider theme={theme}>
            <ModalsProvider>
                <QueryClientProvider client={queryClient}>
                    <UserProvider>
                        <RouterProvider router={router} />
                    </UserProvider>
                </QueryClientProvider>
            </ModalsProvider>
        </MantineProvider>
    </StrictMode>,
);
