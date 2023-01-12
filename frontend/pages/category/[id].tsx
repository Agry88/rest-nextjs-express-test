import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Layout from '../../components/layouts/layout';
import CategoryPostContainer from '../../components/pages-component/category/[id]';

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
            <CategoryPostContainer key={post.id}>
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
            </CategoryPostContainer>
          ))}
        </main>
      </div>
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
