import { usePage } from '@inertiajs/react';
import type { PageProps } from '@/types';
import { router } from '@inertiajs/react';
import Sidebar from '@/components/layout/DashboardLayout';

export default function HomeDashboard() {
    const { auth } = usePage<PageProps>().props;

    return (
        <Sidebar>
            <div className="p-6">
                <h1 className="text-3xl font-bold">Dashboard</h1>

                <div className="mt-6 rounded border p-4">
                    <p>
                        <strong>ID:</strong> {auth.user.id_user}
                    </p>

                    <p>
                        <strong>Name:</strong> {auth.user.nickname}
                    </p>

                    <p>
                        <strong>Business Company:</strong>{' '}
                        {auth.user.business_company}
                    </p>

                    <p>
                        <strong>Email:</strong> {auth.user.email}
                    </p>

                    <p>
                        <strong>Photo:</strong> {auth.user.photo}
                    </p>
                </div>
            </div>
        </Sidebar>
    );
}
