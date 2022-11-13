import { ChevronDown } from 'heroicons-react'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { playlistState, playlistIdState } from '../atoms/playlistAtom';
import { useRecoilValue, useRecoilState } from 'recoil'
import useSpotify from '../hooks/useSpotify';

interface IColors {
  gradient_bg: string;
  profile_btn: string;
}

const colors: IColors[] = [
  { gradient_bg: 'from-indigo-500', profile_btn: `bg-indigo-300` },
  { gradient_bg: 'from-blue-500', profile_btn: `bg-blue-300` },
  { gradient_bg: 'from-green-500', profile_btn: `bg-green-300` },
  { gradient_bg: 'from-red-500', profile_btn: `bg-red-300` },
  { gradient_bg: 'from-yellow-500', profile_btn: `bg-yellow-300` },
  { gradient_bg: 'from-pink-500', profile_btn: `bg-pink-300` },
  { gradient_bg: 'from-purple-500', profile_btn: `bg-purple-300` },
]

const Center: React.FC = () => {
  const platlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)
  const spotifyApi = useSpotify()
  const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;
  const [configColors, setConfigColors] = useState({} as IColors)

  useEffect(() => {
    const randomColorIndex = random(0, colors.length - 1)
    setConfigColors(colors[randomColorIndex])
  }, [platlistId])

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getPlaylist(platlistId).then((data) => {
        setPlaylist(data.body)
      }).catch((error) => {
        console.log('error:', error)
      })
    }
  }, [spotifyApi])

  const { data: session } = useSession()
  return (
    <div className='flex-grow'>
      <header className='absolute right-8 top-5'>
        <div className={`flex items-center space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 ${configColors.profile_btn}`}>
          <img className="rounded-full w-10 h-10" src={session?.user?.image} alt="image" />
          <h2>{session?.user.name}</h2>
          <ChevronDown className='h-5 w-5' />
        </div>
      </header>

      <section className={`flex items-end space-x-7 bg-gradient-to-b  to-black ${configColors.gradient_bg} h-80 text-white padding-8`}>
        <h1>hello</h1>
        {/* <img src="" alt="" /> */}
      </section>
    </div>

  )
}

export default Center