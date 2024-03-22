import React from 'react'
import styles from './style.module.css';
import { useStateValue } from '../../../context/StateProvider';
import DashboardUserCard from '../DashboardUserCard';

export default function DashboardUsers() {
  const [{ users }] = useStateValue()
  

  return (
    <div className={styles.containerUsers}>
       <h4 className={styles.count}>
          count: {users?.length}
        </h4>
      <div className={styles.containerTable} >
        <table>
          <thead>
            <tr>
              <th>image</th>
              <th>name</th>
              <th>email</th>
              <th>verified</th>
              <th>created</th>
              <th>role</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {users && users.map((user) => <DashboardUserCard key={user._id} user={user} /> )}
          </tbody>
        </table>
      </div>


    </div>
  )
}
