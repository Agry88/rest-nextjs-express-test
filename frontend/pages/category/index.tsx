import React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Layout from '../../components/Layout';

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
            <div key={cate.id} className="post">
              <Link className="content" href={`/category/${cate.id}`}>
                {cate.name}
              </Link>
            </div>
          ))}
        </main>
      </div>
      <style>
        {`
                .post {
                  background: white;
                  transition: box-shadow 0.1s ease-in;
                }
        
                .post:hover {
                  box-shadow: 1px 1px 3px #aaa;
                }
        
                .post + .post {
                  margin-top: 2rem;
                }

                .content {
                    padding: 1rem;
                    margin-top: 2rem;
                    margin-bottom: 2rem;
                    background: #f6f6ef;
                    border-radius: 4px;
                    box-shadow: 1px 1px 3px #aaa;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

              `}

      </style>
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
