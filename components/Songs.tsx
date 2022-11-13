import React from 'react'
import { playlistState } from '../atoms/playlistAtom'
import { useRecoilValue } from 'recoil'
import Song from './Song'

const Songs: React.FC = () => {
  const playlist = useRecoilValue(playlistState)

  return (
    <div className='text-white px-8 flex flex-col space-y-1 pb-28'>
      {playlist?.tracks.items.map(({ track }, i) => (
        <Song key={`${track?.id}-${i}`} track={track} order={i} />
      ))}
    </div>
  )
}

export default Songs