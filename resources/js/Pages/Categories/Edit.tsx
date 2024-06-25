import React, { FormEvent, useState } from 'react';

interface Props {
  category: {
    id: number;
    name: string;
  };
}

const Edit: React.FC<Props> = ({ category }) => {
  const [name, setName] = useState(category.name);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);

    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

      if (!csrfToken) {
        throw new Error('CSRF token not found');
      }

      const response = await fetch(`/categories/${category.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken
        },
        body: JSON.stringify({ name })
      });

      if (!response.ok) {
        throw new Error('Failed to update category');
      }

      // Handle success response (e.g., redirect or show message)
      window.location.href = '/categories'; // Example: Redirect to categories index
    } catch (error) {
      console.error('Error updating category:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Update</button>
      </form>
    </div>
  );
};

export default Edit;
