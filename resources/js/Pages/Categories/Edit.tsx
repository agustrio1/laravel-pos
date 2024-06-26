import React, { FormEvent, useState, useEffect } from 'react';

interface Props {
  category: {
    id: number;
    name: string;
    slug: string;
  };
}

const Edit: React.FC<Props> = ({ category }) => {
  const [name, setName] = useState(category.name || '');
  const [slug, setSlug] = useState(category.slug || '');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSlug(name.replace(/\s+/g, '-').toLowerCase());
  }, [name]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        body: JSON.stringify({ name, slug })
      });

      if (!response.ok) {
        if (response.headers.get('Content-Type')?.includes('application/json')) {
          const data = await response.json();
          if (data.errors) {
            setError(data.errors.name[0]);
          } else {
            setError('Failed to update category');
          }
        } else {
          setError('Failed to update category');
        }
        return;
      }

      window.location.href = '/categories'; // Redirect to categories index
    } catch (error) {
      console.error('Error updating category:', error);
      setError('Failed to update category');
    }
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
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug</label>
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
        {error && (
          <div className="text-red-500 mb-4">
            {error}
          </div>
        )}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Update</button>
      </form>
    </div>
  );
};

export default Edit;
