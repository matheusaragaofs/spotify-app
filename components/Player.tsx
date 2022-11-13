import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useState } from 'react'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'
import useSpotify from '../hooks/useSpotify'
import { useRecoilState } from 'recoil'
import useSongInfo from '../hooks/useSongInfo'
import lodash, { debounce } from 'lodash'
import {
    Play as PlayIcon,
    Pause as PauseIcon,
    SwitchHorizontal as SwitchHorizontalIcon,
    Rewind as RewindIcon,
    FastForward as FastForwardIcon,
    Reply as ReplyIcon,
    VolumeUp as VolumeUpIcon,
    VolumeOffOutline as VolumeDownIcon
} from 'heroicons-react'


const Player: React.FC = () => {
    const spotifyApi = useSpotify()
    const { data: session } = useSession()
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const [volume, setVolume] = useState(50)
    const songInfo = useSongInfo()

    const fetchCurrentSong = async () => {
        if (!songInfo) {
            const response = await spotifyApi.getMyCurrentPlayingTrack()
            const item = response?.body?.item
            console.log("Now is playing: ", item)
            setCurrentTrackId(item?.id as string)

            const response2 = await spotifyApi.getMyCurrentPlaybackState()
            setIsPlaying(response2?.body?.is_playing)
        }
    }
    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentSong()
            setVolume(50)
        }

    }, [currentTrackId, spotifyApi, session])

    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debouncedAdjustVolume(volume)
        }
    }, [volume])

    const debouncedAdjustVolume = useCallback(
        debounce((volume: number) => {
            spotifyApi.setVolume(volume)
        }, 500)
        , [])


    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body.is_playing) {
                spotifyApi.pause()
                setIsPlaying(false)
            } else {
                spotifyApi.play()
                setIsPlaying(true)
            }
        })
    }

    return (
        <div className='h-24
        //todo make this bg-gradient via atoms
         bg-gradient-to-r from-slate-900 via-pink-900 to-slate-900 
         text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
            {/* Left */}
            <div className='flex items-center space-x-4'>
                <img className="hidden md:inline h-10 w-10" src={songInfo?.album.images?.[0]?.url} alt="" />
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>
            {/* Center */}
            <div className='flex items-center justify-evenly'>
                <SwitchHorizontalIcon className='button' />
                <RewindIcon className='button' />
                {isPlaying ? (
                    <PauseIcon onClick={handlePlayPause} className='button w-10 h-10' />
                ) : (<PlayIcon onClick={handlePlayPause} className='button w-10 h-10' />)}
                <FastForwardIcon className='button' />
                <ReplyIcon className='button' />
            </div>
            {/* Right */}
            <div className='flex items-center space-x-3 md:space-x-4 justify-end pr-5'>
                <VolumeDownIcon onClick={() => volume > 0 && setVolume(volume - 10)} className='button flex' />
                <input
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className='w-14 md:w-28' type="range" min={0} max={100} value={volume} />
                <VolumeUpIcon
                    onClick={() => volume < 100 && setVolume(volume + 10)}
                    className='button' />
            </div>
        </div>
    )
}

export default Player