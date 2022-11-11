import React from 'react'
import { getProviders, signIn } from 'next-auth/react'

const Login: React.FC<any> = ({ providers }) => {
    console.log('providers', providers);
    
    return (
        <div>Login</div>
    )
}

export default Login



export async function getServerSideProps() {
    //it will run on the server before the page gets delivered to the client, i want to sure i get the latest providers

    const providers = await getProviders();
    return {
        props: {
            providers
        }
    }

}