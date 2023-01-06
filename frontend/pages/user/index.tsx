import Layout from "../../components/Layout"
import { GetServerSideProps } from "next"
import User from "../../components/User"

type user = {
    id: number,
    name: string,
    email: string,
}

type Prop = {
    users: user[]
}

export default function UserPage({ users }: Prop) {

    return (

        <Layout>
            <div className="page">
                <h1>User List</h1>
                <main>
                    {users?.map((user, index) => (
                        <div key={user.id} className="post">
                            <User user={user} />
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

export const getServerSideProps: GetServerSideProps = async () => {
    const res = await fetch('http://localhost:3001/user')
    const users = await res.json()
    return {
        props: { users },
    }
}

