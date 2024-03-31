import React from 'react'

export default function AnAuthorizedUser() {
    return (
        <div className='loading'>
            <p> user not Authorized </p>
            <Link to="/login"> return to login page </Link>
        </div>
    )
}
