import { reducerCases } from './constants';

const reducer = (state, action) => {
    /// console.log(" from reducer", state);


    switch (action.type) {
        case reducerCases.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case reducerCases.SET_USERS:
            return {
                ...state,
                users: action.users,
            };
        case reducerCases.SET_ARTISTS:
            return {
                ...state,
                artists: action.artists,
            };
        case reducerCases.SET_ALBUMS:
            return {
                ...state,
                albums: action.albums,
            };
        case reducerCases.SET_SONGS:
            return {
                ...state,
                songs: action.songs,
            };
        case reducerCases.SET_SELECT_ALBUM:
            return {
                ...state,
                selectedAlbum: action.selectedAlbum,
            };
        case reducerCases.SET_ALBUM_SONGS:
            return {
                ...state,
                albumSongs: action.albumSongs,
            };
        case reducerCases.SET_CURRENT_SONG_INDEX:
            return {
                ...state,
                currentSongIndex: action.currentSongIndex,
            };
        case reducerCases.SET_CURRENT_SONG:
            return {
                ...state,
                currentSong: action.currentSong,
            };
        case reducerCases.SET_IS_PLAYING:
            return {
                ...state,
                isPlaying: action.isPlaying,
            };
        case reducerCases.SET_AUDIO_REF: // Add reducer case for setting audioRef
            return {
                ...state,
                audioRef: action.audioRef,
            };
        case reducerCases.SET_ARTISTS_SELECTED:
            return {
                ...state,
                artistSelected: action.artistSelected,
            };
        case reducerCases.SET_ALBUM_SELECTED:
            return {
                ...state,
                albumSongsSelected: action.albumSongsSelected,
            };
        case reducerCases.SET_LANGUAGE_SELECTED:
            return {
                ...state,
                languageSelected: action.languageSelected,
            };
        case reducerCases.SET_CATEGORY_SELECTED:
            return {
                ...state,
                selectedCategory: action.selectedCategory,
            };

        case reducerCases.SET_SONGS_PLAYED:
            return {
                ...state,
                songsPlayed: action.songsPlayed,
            };
        default:
            return state;
    }
};

export default reducer;