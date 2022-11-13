import React, { useEffect, useState } from 'react'
import {
    HomeOutline,
    Heart,
    SearchOutline,
    LibraryOutline,
    PlusCircleOutline,
    RssOutline

} from 'heroicons-react'
import { signOut, useSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom'

const Sidebar: React.FC = () => {
    const { data: session } = useSession()

    const spotifyApi = useSpotify()
    const [playlists, setPlaylists] = useState([] as SpotifyApi.PlaylistObjectSimplified[])
    const [platlistId, setPlaylistId] = useRecoilState(playlistIdState)
    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            try {
                const getPlaylists = async () => {
                    const { body: { items } } = await spotifyApi.getUserPlaylists()
                    setPlaylists(items)
                }
                getPlaylists()
            } catch (error) {
                console.log('error:', error)
            }
        }
    }, [session, spotifyApi])

    return (
        <div className='text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll  scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36
         '>
            <div className='space-y-4'>
                <button className='flex items-center  space-x-2 hover:text-white '>
                    <HomeOutline className='h-5 w-5' />
                    <p>Home</p>
                </button>
                <button className='flex items-center  space-x-2 hover:text-white '>
                    <SearchOutline className='h-5 w-5' />
                    <p>Search</p>
                </button>
                <button className='flex items-center  space-x-2 hover:text-white '>
                    <LibraryOutline className='h-5 w-5' />
                    <p>Your Library</p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900' />
                <button className='flex items-center  space-x-2 hover:text-white '>
                    <PlusCircleOutline className='h-5 w-5' />
                    <p>Create Playlist</p>
                </button>
                <button className='flex items-center  space-x-2 hover:text-white '>
                    <Heart className='h-5 w-5  text-blue-500' />
                    <p>Liked Songs</p>
                </button>
                <button className='flex items-center  space-x-2 hover:text-white '>
                    <RssOutline className='h-5 w-5   text-green-500'  />
                    <p>Your Episodes</p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900' />
                {/* Playlist */}
                {playlists?.map((playlist) => {
                    return <p onClick={() => setPlaylistId(playlist?.id)} key={playlist?.id} className='cursor-pointer py-1 hover:text-white '>{playlist?.name}</p>

                })}

            </div>
        </div>


    )
}

export default Sidebar