import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/layouts/layout';
import CategoryItem from '../../components/shared-component/category/category-item';

type Category = {
  id: number,
  name: string,
};

type Prop = {
  categories: Category[]
};

export default function CategoryPage({ categories }: Prop) {
  return (

    <Layout>
      <div className="page">
        <h1>Category List</h1>
        <main>
          {categories.map((cate) => (
            <CategoryItem
              key={cate.id}
              href={`/category/${cate.id}`}
              name={cate.name}
            />
          ))}
        </main>
      </div>
    </Layout>

  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:3001/api/category');
  const categories = await res.json();
  return {
    props: { categories },
  };
};
