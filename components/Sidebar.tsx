import React, { useEffect, useState } from 'react'
import {
    HomeOutline,
    HeartOutline,
    SearchOutline,
    LibraryOutline,
    PlusCircleOutline,
    RssOutline

} from 'heroicons-react'
import { signOut, useSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify'
interface Playlist {
    collaborative: boolean;
    description: string;
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: {
        height?: any;
        url: string;
        width?: any;
    }[];
    name: string;
    owner: {
        display_name: string;
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        type: string;
        uri: string;
    };
    primary_color?: any;
    public: boolean;
    snapshot_id: string;
    tracks: {
        href: string;
        total: number;
    };
    type: string;
    uri: string;
}



const Sidebar: React.FC = () => {
    const { data: session } = useSession()


    const spotifyApi = useSpotify()
    const [playlists, setPlaylists] = useState([] as any)
    const [platlistId, setPlaylistId] = useState<null | string>(null)
    console.log('platlistId:', platlistId)
    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            const getPlaylists = async () => {
                const { body: { items } } = await spotifyApi.getUserPlaylists()
                setPlaylists(items)
            }
            getPlaylists()
        }
    }, [session, spotifyApi])

    return (
        <div className='text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll  scrollbar-hide h-screen w-1/5'>
            <div className='space-y-4'>
                <button onClick={() => signOut()}
                    className='flex items-center  space-x-2 hover:text-white '>
                    <p>Logout</p>
                </button>
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
                    <HeartOutline className='h-5 w-5' />
                    <p>Liked Songs</p>
                </button>
                <button className='flex items-center  space-x-2 hover:text-white '>
                    <RssOutline className='h-5 w-5' />
                    <p>Your Episodes</p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900' />
                {/* Playlist */}
                {playlists?.map((playlist: Playlist) => {
                    return <p onClick={() => setPlaylistId(playlist?.id)} key={playlist?.id} className='cursor-pointer hover:text-white truncate'>{playlist?.name}</p>

                })}

            </div>
        </div>


    )
}

export default Sidebar