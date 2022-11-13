import { ChevronDown } from 'heroicons-react'
import { signOut, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { playlistState, playlistIdState } from '../atoms/playlistAtom';
import { useRecoilValue, useRecoilState } from 'recoil'
import useSpotify from '../hooks/useSpotify';
import Songs from './Songs';

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
    spotifyApi.getPlaylist(platlistId).then((data) => {
      setPlaylist(data.body)
    }).catch((error) => {
      console.log('error:', error)
    })
  }, [spotifyApi, platlistId])

  const { data: session } = useSession()
  return (
    <div className='flex-grow h-screen overflow-y-scroll scrollbar-hide'>
      <header className='absolute right-8 top-5'>
        <div className={`flex items-center space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 ${configColors.profile_btn}`} onClick={() => signOut()}>
          <img className="rounded-full w-10 h-10" src={session?.user?.image} alt="image" />
          <h2>{session?.user.name}</h2>
          <ChevronDown className='h-5 w-5' />
        </div>
      </header>

      <section className={`flex items-end space-x-7 bg-gradient-to-b  to-black ${configColors.gradient_bg} h-80 text-white p-8`}>
        <img className="h-44 w-44 shadow-2xl" src={playlist?.images?.[0]?.url} alt="playlist-image" />
        <div>
          <p>PLAYLIST</p>
          <h1 className='text-2xl md:text-3xl xl:text-4xl font-bold'>{playlist?.name}</h1>
        </div>
        <div>
        </div>
      </section>
      <Songs />
    </div>

  )
}

export default Center