import React from 'react'
import { GetServerSideProps } from 'next'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'
import Router from 'next/router'
import { PostProps } from '../../components/Post'


type UserProp = {
    id: number,
    name: string,
    email: string,
}

const Post: React.FC<UserProp> = user => {
    return (
        <Layout>
            <div>
                <h2>{user.name}</h2>
                <small>By {user.email}</small>
            </div>
            <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }
        .actions {
          margin-top: 2rem;
        }
        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }
        button + button {
          margin-left: 1rem;
        }
      `}</style>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch(`http://localhost:3001/user/${context.params.id}`)
    const data = await res.json()
    return { props: { ...data } }
}

export default Post