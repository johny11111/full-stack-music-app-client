import React, { useEffect } from 'react'
import Song from '../Song'
import { useStateValue } from '../../context/StateProvider'

export default function Library() {

    const [{ user }] = useStateValue()

    return (
        <div>
            {user?.playlist && user.playlist.map((item, i) => <Song key={i} song={item} i={i} />)}
        </div>
    )
}
