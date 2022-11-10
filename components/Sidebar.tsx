import React from 'react'
import {
    HomeOutline,
    HeartOutline,
    SearchOutline,
    LibraryOutline,
    PlusCircleOutline,
    RssOutline

} from 'heroicons-react'

const Sidebar: React.FC = () => {
    return (
        <div className='text-gray-500 p-5 text-sm border-r border-gray-900'>
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
                    <HeartOutline className='h-5 w-5' />
                    <p>Liked Songs</p>
                </button>
                <button className='flex items-center  space-x-2 hover:text-white '>
                    <RssOutline className='h-5 w-5' />
                    <p>Your Episodes</p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900' />
                {/* Playlist */}
                <p className='cursor-pointer hover:text-white'>Playlist Name</p>
                <p className='cursor-pointer hover:text-white'>Playlist Name</p>
                <p className='cursor-pointer hover:text-white'>Playlist Name</p>
                <p className='cursor-pointer hover:text-white'>Playlist Name</p>
             
            </div>
        </div>


    )
}

export default Sidebar