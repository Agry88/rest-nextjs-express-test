import React from 'react'
import Router from 'next/router'
import ReactMarkdown from 'react-markdown'

export type UsertProps = {
  id: number;
  name: string;
  email: string;
}

const User: React.FC<{ user: UsertProps }> = ({ user }) => {
  const userName = user.name ? user.name : 'Unknown user'
  return (
    <div onClick={() => Router.push('/user/[id]', `/user/${user.id}`)}>
      <h2>{user.name}</h2>
      <small>By {userName}</small>
      <style jsx>{`
          div {
            color: inherit;
            padding: 2rem;
          }
        `}</style>
    </div>
  )
}

export default User