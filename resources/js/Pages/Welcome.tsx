import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import Layout from "@/Layouts/Layout";

export default function SelamatDatang({ auth }: PageProps) {
    return (
        <Layout>
            <Head title="Sistem POS" />
            <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                <h1 className="text-3xl font-bold text-center p-6">
                    Selamat Datang di Sistem POS
                </h1>
                {auth.user ? (
                    <div className="p-6">
                        <p className="text-center mb-4">
                            Halo, {auth.user.name || "User"}!
                        </p>
                        <div className="flex justify-around mt-6">
                            <Link
                                href="/sales"
                                className="text-blue-500 hover:underline"
                            >
                                Penjualan
                            </Link>
                            <Link
                                href="/products"
                                className="text-blue-500 hover:underline"
                            >
                                Produk
                            </Link>
                            <Link
                                href="/reports"
                                className="text-blue-500 hover:underline"
                            >
                                Laporan
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="p-6">
                        <p className="text-center mb-4">
                            Silakan{" "}
                            <Link
                                href="/login"
                                className="text-blue-500 hover:underline"
                            >
                                login
                            </Link>{" "}
                            untuk mengakses sistem.
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
}
