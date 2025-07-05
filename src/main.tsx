import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';

// components
import App from './App.tsx';
import Progress from './components/Progress.tsx';

// styles
import theme from './styles/theme.ts';
import './index.scss';
import '@mantine/core/styles.css';

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/:id',
        element: <Progress />,
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </MantineProvider>
    </StrictMode>,
);
