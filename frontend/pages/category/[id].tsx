import Layout from "../../components/Layout"
import { GetServerSideProps } from "next"

type categorysPostData = {
    id: number,
    title: string,
    content: string,
    authorId: number,
}

type Prop = {
    categorysPostData: categorysPostData[]
}

export default function CategoryPage({ categorysPostData }: Prop) {
    return (

        <Layout>
            <div className="page">
                <h1>Category List</h1>
                <main>
                    {categorysPostData.map((post, index) => (
                        <div key={post.id} className="post">
                            <div>Title is : {post.title}</div>
                            <div>Content is : {post.content}</div>
                            <div>authorId is : {post.authorId}</div>
                        </div>
                    ))}
                </main>
            </div>
            <style jsx>{`
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
              `}</style>
        </Layout>

    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch(`http://localhost:3001/category/${context.params.id}`)
    const categorysPostData = await res.json()
    return {
        props: { categorysPostData },
    }
}

