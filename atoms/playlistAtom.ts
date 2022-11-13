import { atom } from 'recoil'

export const playlistIdState = atom({
    key: 'playlistIdState',
    default: '2APVTN27nKIFNMrJ8GXo8U' //Pop Internacional
})

export const playlistState = atom<SpotifyApi.SinglePlaylistResponse | null>({
    key:"playlistState",
    default: null,
})