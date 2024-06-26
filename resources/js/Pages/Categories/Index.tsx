import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import Modal from "./Modal";
import CategoryForm from "./CategoryForm";
import Layout from "@/Layouts/Layout";

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Props {
    categories: Category[];
}

const Index: React.FC<Props> = ({ categories }) => {
    const [showModal, setShowModal] = useState(false);
    const [editCategory, setEditCategory] = useState<Category | null>(null);

    const openModal = (category: Category | null = null) => {
        setEditCategory(category);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditCategory(null);
    };

    const deleteCategory = async (id: number) => {
        try {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");

            if (!csrfToken) {
                throw new Error("CSRF token not found");
            }

            const response = await fetch(`/categories/${id}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete category");
            }
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    return (
        <>
            <Layout>
                <Head title="Categories">
                    <title>Categories</title>
                    <link rel="icon" href="/favicon.ico" />
                    
                  </Head>
                <div className="container mx-auto py-8">
                    <h1 className="text-3xl font-bold mb-6 text-center">
                        Categories
                    </h1>
                    <button
                        onClick={() => openModal()}
                        className="mb-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                        Add Category
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="bg-white p-4 shadow-md rounded-lg"
                            >
                                <p className="text-xl font-semibold">
                                    {category.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Slug: {category.slug}
                                </p>
                                <div className="flex mt-4 space-x-2">
                                    <button
                                        onClick={() => openModal(category)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            deleteCategory(category.id)
                                        }
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {showModal && (
                        <Modal onClose={closeModal}>
                            <CategoryForm
                                category={editCategory}
                                onClose={closeModal}
                            />
                        </Modal>
                    )}
                </div>
            </Layout>
        </>
    );
};

export default Index;
