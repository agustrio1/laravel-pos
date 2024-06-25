import React from 'react';
import { Link } from '@inertiajs/react';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Props {
  categories: Category[];
}

const Index: React.FC<Props> = ({ categories }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div className="grid grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-white p-4 shadow-md rounded-lg">
            <p className="text-lg font-semibold">{category.name}</p>
            <p className="text-sm text-gray-500">Slug: {category.slug}</p>
            <Link
              href={`/categories/${category.id}/edit`}
              className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
