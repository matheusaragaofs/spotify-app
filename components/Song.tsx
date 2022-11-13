import React from 'react'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSpotify from '../hooks/useSpotify';
import { millisToMinutesAndSeconds } from '../lib/time';
import { useRecoilState } from 'recoil'
interface SongProps {
    track: SpotifyApi.TrackObjectFull | null;
    order: number
}

const Song: React.FC<SongProps> = ({ track, order }) => {
    const spotifyApi = useSpotify()
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const playSong = () => {
        spotifyApi.play({
            uris: [track?.uri as string] //uri = uniform resource indentifier
        }).then(() => {
            setCurrentTrackId(track?.id as string)
            setIsPlaying(true)
        })
        .catch((err) => alert('Please open a spotify app, no device found\n' + err?.message))
    }
    return (
        <div
        onClick={playSong}
        className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer">
            <div className='flex items-center space-x-4 '>
                <p>{order + 1}</p>
                <img className='w-10 h-10' src={track?.album?.images[0]?.url} alt="" />
                <div>
                    <p className='w-36 text-white lg:w-64 truncate'>{track?.name}</p >
                    <p className='w-40'>{track?.artists[0].name}</p >
                </div>
            </div>
            <div className='flex items-center justify-between ml-auto md:ml-0'>
                <p className='w-80 truncate hidden md:inline'>{track?.album.name}</p>
                <p>{millisToMinutesAndSeconds(track?.duration_ms as number)}</p>
            </div>
        </div>
    )
}

export default Song