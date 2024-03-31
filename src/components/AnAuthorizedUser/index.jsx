import React from 'react'
import { Link } from 'react-router-dom'

export default function AnAuthorizedUser() {
    return (
        <div className='loading'>
            <p> user not Authorized </p>
            <Link to="/login"> return to login page </Link>
        </div>
    )
}
