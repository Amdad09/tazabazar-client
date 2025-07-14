import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { router } from './routers/router.jsx';
import Aos from 'aos';
import 'aos/dist/aos.css';
import AuthProvider from './context/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

Aos.init();
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <div className="poppins max-w-7xl mx-auto">
                <AuthProvider>
                    <RouterProvider router={router} />
                    <Toaster position="top-right" />
                </AuthProvider>
            </div>
        </QueryClientProvider>
    </StrictMode>,
);
