import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import type { PageProps } from '@/types';
import {
    LayoutDashboard,
    TrendingUp,
    BarChart2,
    Package,
    ChevronDown,
    BrainCircuit,
    Activity,
    ShoppingCart,
    FileSpreadsheet,
    FileBarChart,
    Bell,
    Settings,
    LogOut,
    PanelLeftClose,
    PanelLeftOpen,
    Sparkles,
    Layers,
    Plus,
} from 'lucide-react';

type NavItem = {
    label: string;
    icon: React.ReactNode;
    href?: string;
    children?: { label: string; icon: React.ReactNode; href: string }[];
};

const navItems: NavItem[] = [
    {
        label: 'Dashboard',
        icon: <LayoutDashboard size={18} />,
        href: '/dashboard',
    },
    {
        label: 'Analytics',
        icon: <TrendingUp size={18} />,
        children: [
            {
                label: 'Sales Analytics',
                icon: <BarChart2 size={16} />,
                href: '/analytics/sales',
            },
            {
                label: 'Product Analytics',
                icon: <Package size={16} />,
                href: '/analytics/products',
            },
        ],
    },
    {
        label: 'Forecasting & Clustering',
        icon: <Sparkles size={18} />,
        children: [
            {
                label: 'Revenue Forecast',
                icon: <TrendingUp size={16} />,
                href: '/forecasting/revenue',
            },
            {
                label: 'Demand Forecast',
                icon: <Activity size={16} />,
                href: '/forecasting/demand',
            },
            {
                label: 'Product Cluster',
                icon: <Layers size={16} />,
                href: '/forecasting/product-cluster',
            },
            {
                label: 'AI Model Monitoring',
                icon: <BrainCircuit size={16} />,
                href: '/forecasting/ai-monitoring',
            },
        ],
    },
    {
        label: 'Data Management',
        icon: <Package size={18} />,
        children: [
            {
                label: 'Products',
                icon: <Package size={16} />,
                href: '/data/products',
            },
            {
                label: 'Orders',
                icon: <ShoppingCart size={16} />,
                href: '/data/orders',
            },
        ],
    },
    {
        label: 'Reports',
        icon: <FileBarChart size={18} />,
        children: [
            {
                label: 'Excel Reports',
                icon: <FileSpreadsheet size={16} />,
                href: '/reports/excel',
            },
            {
                label: 'Analytics Reports',
                icon: <FileBarChart size={16} />,
                href: '/reports/analytics',
            },
        ],
    },
];

export default function AppLayout({
    children,
}: {
    children?: React.ReactNode;
}) {
    const { auth } = usePage<PageProps>().props;

    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
        Analytics: false,
    });
    const [collapsed, setCollapsed] = useState(false);
    const [activeHref, setActiveHref] = useState('/dashboard');

    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const logout = () => {
        router.post('/logout');
    };

    const toggleMenu = (label: string) => {
        setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
    };

    return (
        <div
            className="flex h-screen bg-[#f5f5f7] font-[system-ui]"
            style={{ fontFamily: "'DM Sans', 'Geist', system-ui, sans-serif" }}
        >
            {/* Sidebar */}
            <aside
                className={`flex flex-col border-r border-neutral-200 bg-white transition-all duration-300 ease-in-out ${
                    collapsed ? 'w-[84px]' : 'w-[260px]'
                } shrink-0`}
            >
                {/* Logo */}
                <div className="flex h-[60px] items-center gap-3 border-b border-neutral-100 px-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-900">
                        <BarChart2 size={16} className="text-white" />
                    </div>
                    {!collapsed && (
                        <span className="text-[15px] font-semibold tracking-tight text-neutral-900">
                            SBADA
                        </span>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="ml-auto text-neutral-400 transition-colors hover:text-neutral-700"
                    >
                        {collapsed ? (
                            <PanelLeftOpen size={17} />
                        ) : (
                            <PanelLeftClose size={17} />
                        )}
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-1">
                    <div className="px-2 pt-3">
                        <button
                            className={`flex w-full items-center gap-3 rounded-lg bg-neutral-200 px-3 py-2 text-sm text-black transition-colors hover:bg-neutral-800 hover:text-white ${
                                collapsed ? 'justify-center' : ''
                            }`}
                        >
                            <Plus size={18} className="shrink-0" />

                            {!collapsed && (
                                <span className="font-medium">
                                    Add Sales Today
                                </span>
                            )}
                        </button>
                    </div>

                    <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-1"></nav>

                    {navItems.map((item) => {
                        const isGroup = !!item.children;
                        const isOpen = openMenus[item.label];

                        if (!isGroup) {
                            const isActive = activeHref === item.href;
                            return (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveHref(item.href!);
                                    }}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                                        isActive
                                            ? 'bg-neutral-900 text-white'
                                            : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                                    } ${collapsed ? 'justify-center' : ''}`}
                                    title={collapsed ? item.label : undefined}
                                >
                                    <span className="shrink-0">
                                        {item.icon}
                                    </span>
                                    {!collapsed && (
                                        <span className="font-medium">
                                            {item.label}
                                        </span>
                                    )}
                                </a>
                            );
                        }

                        return (
                            <div key={item.label}>
                                <button
                                    onClick={() => toggleMenu(item.label)}
                                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-800 ${
                                        collapsed ? 'justify-center' : ''
                                    }`}
                                    title={collapsed ? item.label : undefined}
                                >
                                    <span className="shrink-0">
                                        {item.icon}
                                    </span>
                                    {!collapsed && (
                                        <>
                                            <span className="flex-1 text-left text-[11px] font-medium tracking-wide text-neutral-400 uppercase">
                                                {item.label}
                                            </span>
                                            <ChevronDown
                                                size={14}
                                                className={`transition-transform duration-200 ${
                                                    isOpen ? 'rotate-180' : ''
                                                }`}
                                            />
                                        </>
                                    )}
                                </button>

                                {!collapsed && isOpen && (
                                    <div className="mt-0.5 mb-1 ml-3 space-y-0.5 border-l border-neutral-200 pl-3">
                                        {item.children!.map((child) => {
                                            const isActive =
                                                activeHref === child.href;
                                            return (
                                                <a
                                                    key={child.label}
                                                    href={child.href}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setActiveHref(
                                                            child.href,
                                                        );
                                                    }}
                                                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                                                        isActive
                                                            ? 'bg-neutral-900 text-white'
                                                            : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                                                    }`}
                                                >
                                                    <span className="shrink-0">
                                                        {child.icon}
                                                    </span>
                                                    <span>{child.label}</span>
                                                </a>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* Bottom */}
                <div className="space-y-1 border-t border-neutral-100 p-3">
                    <button
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-800 ${collapsed ? 'justify-center' : ''}`}
                    >
                        <Settings size={17} />
                        {!collapsed && <span>Settings</span>}
                    </button>
                    <button
                        onClick={() => setShowLogoutConfirm(true)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-500 transition-colors hover:bg-red-50 ${collapsed ? 'justify-center' : ''}`}
                    >
                        <LogOut size={17} />
                        {!collapsed && <span>Sign Out</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Topbar */}
                <header className="flex h-[60px] shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-6">
                    <div>
                        <h1 className="text-[15px] font-semibold text-neutral-900">
                            Smart Business Analytics Dashboard Automation
                        </h1>
                        <p className="text-xs text-neutral-800">
                            Welcome back <b>{auth.user.nickname}</b>, Here's
                            what's happening in{' '}
                            <b>{auth.user.business_company}!</b>
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100">
                            <Bell size={17} />
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
                        </button>
                        <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-neutral-900 text-xs font-semibold text-white">
                            <img
                                src={`/storage/image_profile/${auth.user.photo}`}
                                alt="Profile"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {children ?? (
                        <p className="text-sm text-neutral-500">Hello World</p>
                    )}
                </main>
            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="w-[360px] rounded-xl bg-white p-6 shadow-xl">
                        <h2 className="text-lg font-semibold text-neutral-900">
                            Sign Out
                        </h2>

                        <p className="mt-2 text-sm text-neutral-500">
                            Are you sure you want to sign out?
                        </p>

                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                className="rounded-lg px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-100"
                            >
                                No
                            </button>

                            <button
                                onClick={() => {
                                    setShowLogoutConfirm(false);
                                    logout();
                                }}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
