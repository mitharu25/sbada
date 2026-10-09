import { usePage } from '@inertiajs/react';
import type { PageProps } from '@/types';
import Sidebar from '@/components/layout/DashboardLayout';

export default function Product() {
    return (
        <Sidebar>
            <h1>Product Page</h1>
        </Sidebar>
    );
}
