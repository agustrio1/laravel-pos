// File: Create.tsx

import React, { FormEvent, useEffect, useState } from "react";

interface Props {
    categories: any[]; // Jika Anda perlu prop lain dari parent component, tambahkan di sini
}

const Create: React.FC<Props> = ({ categories }) => {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");

    useEffect(() => {
        setSlug(name.replace(/\s+/g, "-").toLowerCase());
    }, [name]);

    const getCsrfToken = () => {
        const tokenElement = document.querySelector('meta[name="csrf-token"]');
        return tokenElement ? tokenElement.getAttribute('content') : null;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const csrfToken = getCsrfToken();

        if (!csrfToken) {
            console.error("CSRF token not found");
            return;
        }

        const currentSlug = name.replace(/\s+/g, "-").toLowerCase();

        try {
            const response = await fetch("/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
                credentials: 'same-origin',
                body: JSON.stringify({ name, slug: currentSlug }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error creating category:", errorData);
                throw new Error("Failed to create category");
            }

            window.location.href = "/categories";
        } catch (error) {
            console.error("Error creating category:", error);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Create Category</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="slug"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Slug
                    </label>
                    <input
                        type="text"
                        id="slug"
                        name="slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Create;
