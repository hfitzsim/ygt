import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import Progress from './components/Progress.tsx';
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

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
        <MantineProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </MantineProvider>
    </StrictMode>,
);
