import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function Layout() {
    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
                <div className="container mx-auto px-6 py-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
