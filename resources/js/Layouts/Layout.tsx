import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Dropdown from "@/Components/Dropdown";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { auth }: any = usePage().props;
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="bg-gray-50 text-black min-h-screen">
            {/* Navbar */}
            <nav className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        {/* Menu button for mobile */}
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
                            >
                                <span className="sr-only">Toggle menu</span>
                                {menuOpen ? (
                                    <FiX
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <FiMenu
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                )}
                            </button>
                        </div>
                        <div className="flex-1 flex items-center justify-between sm:justify-start">
                            <div className="mx-auto lg:mx-0 flex-shrink-0 items-center">
                                <svg
                                    className="h-6 w-6 justify-end none"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M3 3H5L6 15H18L19 3H21"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <circle
                                        cx="7"
                                        cy="20"
                                        r="2"
                                        fill="currentColor"
                                    />
                                    <circle
                                        cx="17"
                                        cy="20"
                                        r="2"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                            {/* Desktop menu */}
                            <div className="hidden sm:flex sm:flex-grow sm:items-center sm:justify-end sm:space-x-4">
                                <Link
                                    href="/sales"
                                    className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Penjualan
                                </Link>
                                <Link
                                    href="/products"
                                    className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Produk
                                </Link>
                                <Link
                                    href="/reports"
                                    className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Laporan
                                </Link>
                                {auth.user ? (
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {auth.user.name}
                                                    <svg
                                                        className="ms-2 -me-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route("profile.edit")}
                                            >
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                method="post"
                                                href={route("logout")}
                                                as="button"
                                            >
                                                Logout
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                ) : (
                                    <Link
                                        href="/login"
                                        className="text-blue-500 hover:underline px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Login
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Mobile menu */}
                {menuOpen && (
                    <div className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
                            <Link
                                href="/sales"
                                className="text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Penjualan
                            </Link>
                            <Link
                                href="/products"
                                className="text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Produk
                            </Link>
                            <Link
                                href="/reports"
                                className="text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Laporan
                            </Link>
                            {auth.user ? (
                                <>
                                    <Link
                                        href={route("profile.edit")}
                                        className="text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        method="post"
                                        href={route("logout")}
                                        as="button"
                                        className="text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        Logout
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    href="/login"
                                    className="text-blue-500 hover:underline block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Konten utama */}
            <main className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
