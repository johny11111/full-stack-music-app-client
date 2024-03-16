export const initialState = {
    user: null,
    users: null,
    songs: null,
    albumSongs: null,
    artists: null,
    albums: null,
    selectedAlbum: null,
    currentSongIndex: null,
    currentSong: null,
    isPlaying: true,

    // context for save song 

    artistSelected: null,
    albumSongsSelected: null,
    languageSelected: null,
    selectedCategory: null,

    // Add audioRef to the initial state
    audioRef: null,
    songsPlayed: null,
}
