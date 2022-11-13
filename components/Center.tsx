import { ChevronDown } from 'heroicons-react'
import { signOut, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { playlistState, playlistIdState } from '../atoms/playlistAtom';
import { useRecoilValue, useRecoilState } from 'recoil'
import useSpotify from '../hooks/useSpotify';
import Songs from './Songs';

const Center: React.FC = () => {
  const platlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)
  const spotifyApi = useSpotify()

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
      <header className='absolute right-8 top-5 z-10'>
        <div className={`flex items-center space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2  bg-white/10 text-white backdrop-blur-lg `} onClick={() => signOut()}>
          <img className="rounded-full w-10 h-10" src={session?.user?.image} alt="image" />
          <h2 className='max-w-[140px] truncate'>{session?.user.name}</h2>
          <ChevronDown className='h-5 w-5' />
        </div>
      </header>

      <section className={`flex items-end space-x-7 bg-gradient-to-r from-green-900 via-green-500 to-slate-900  backdrop-blur-sm h-80 text-white p-8`}>
        {playlist?.images?.[0]?.url && <img className="h-44 w-44 shadow-2xl" src={playlist?.images?.[0]?.url} alt="" />}
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