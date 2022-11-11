import React from 'react'
import { getProviders, signIn, ClientSafeProvider } from 'next-auth/react'

const Login: React.FC<any> = ({ providers }) => {
    return (
        <div className='flex flex-col items-center bg-black min-h-screen w-full justify-center'>
            <img className='w-52 mb-5' src="https://links.papareact.com/9xl" alt='' />

            {Object.values(providers as ClientSafeProvider[]).map((provider) => (
                <div key={provider.name}>
                    <button 
                        onClick={()=> signIn(provider.id,  { callbackUrl: '/' })}
                        className='bg-[#18D860] text-white p-5 rounded-lg'>Login with {provider.name}</button>
                </div>
           ))}
        </div>
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