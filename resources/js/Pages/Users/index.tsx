import React from "react";
import Layout from "@/Layouts/Layout";
import { Link, usePage } from "@inertiajs/react";

interface User {
    id: number;
    name: string;
    email: string;
}

interface Props {
    users: User[];
}

const Index: React.FC<Props> = ({ users }) => {
    const { auth }: any = usePage().props;

    return (
        <Layout>
            <h1 className="text-3xl font-bold text-center p-6">
                Daftar Pengguna
            </h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 text-gray-600 uppercase tracking-wider">
                                Nama
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 text-gray-600 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 text-gray-600 uppercase tracking-wider">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                                    {user.name}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                                    <Link
                                        href={`/users/${user.id}/edit`}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Index;
