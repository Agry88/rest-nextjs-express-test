import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';

type CategorysPostData = {
  id: number,
  title: string,
  content: string,
  authorId: number,
};

type Prop = {
  categorysPostData: CategorysPostData[]
};

export default function CategoryPage({ categorysPostData }: Prop) {
  const router = useRouter();

  const handleDeleteCategory = async () => {
    await fetch(`http://localhost:3001/api/category/${router.query.id}`, {
      method: 'DELETE',
    });
    router.push('/category');
  };

  return (

    <Layout>
      <div className="page">
        <h1>Category List</h1>
        <main>
          {categorysPostData.map((post) => (
            <div key={post.id} className="post">
              <button type="button" onClick={() => handleDeleteCategory()}>Delete</button>
              <div>
                Title is :
                {' '}
                {post.title}
              </div>
              <div>
                Content is :
                {' '}
                {post.content}
              </div>
              <div>
                authorId is :
                {' '}
                {post.authorId}
              </div>
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
              `}

      </style>
    </Layout>

  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`http://localhost:3001/api/category/${context.params.id}`);
  const categorysPostData = await res.json();
  return {
    props: { categorysPostData },
  };
};
