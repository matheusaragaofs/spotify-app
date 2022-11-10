import type { NextPage } from 'next'
import Sidebar from '../components/Sidebar'


const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen
     overflow-hidden  // to only div's inside it to have overflow
    ">
    <main>
    <Sidebar/>
    {/* Center */}
    </main>
      <div>
      {/* Player */}
      </div>
    </div>
  )
}

export default Home