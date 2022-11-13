import type { NextPage } from 'next'
import Center from '../components/Center'
import Sidebar from '../components/Sidebar'


const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen
     overflow-hidden  // to only div's inside it to have overflow
    ">
      <main className='flex'>
        <Sidebar />
        <Center />
      </main>
      <div>
        {/* Player */}
      </div>
    </div>
  )
}

export default Home