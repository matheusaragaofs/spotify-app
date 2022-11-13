import React, { useEffect, useState } from 'react'
import useSpotify from './useSpotify'
import { useRecoilValue } from 'recoil'
import { currentTrackIdState } from '../atoms/songAtom'

const useSongInfo = () => {
    const spotifyApi = useSpotify()
    const currentTrackId = useRecoilValue(currentTrackIdState)
    const [songInfo, setSongInfo] = useState<SpotifyApi.TrackObjectFull | null>(null)

    useEffect(() => {
        const fetchSongInfo = async () => {
            if (currentTrackId) {
                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${currentTrackId}`,
                    { headers: { Authorization: `Bearer ${spotifyApi.getAccessToken()}` } }
                ).then((res => res.json())
                )
                setSongInfo(trackInfo as any)
            }
        }
        fetchSongInfo()
    }, [currentTrackId, spotifyApi])


    return songInfo
}

export default useSongInfo