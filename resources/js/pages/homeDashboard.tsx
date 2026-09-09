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
                        <strong>ID:</strong> {auth.user.id}
                    </p>

                    <p>
                        <strong>Name:</strong> {auth.user.name}
                    </p>

                    <p>
                        <strong>Email:</strong> {auth.user.email}
                    </p>

                    <p>
                        <strong>Company:</strong> {auth.user.name_company}
                    </p>

                    <p>
                        <strong>Phone:</strong> {auth.user.phone_number}
                    </p>
                </div>
            </div>
        </Sidebar>
    );
}
