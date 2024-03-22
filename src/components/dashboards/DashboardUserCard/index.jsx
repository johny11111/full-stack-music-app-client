import React, { useState } from 'react';
import styles from './style.module.css';
import moment from 'moment';
import { changUserRole, getAllUsers } from '../../../api';
import { reducerCases } from '../../../context/constants';
import { useStateValue } from '../../../context/StateProvider';

export default function DashboardUserCard({ user }) {
  const [{ users }, dispatch] = useStateValue()

  const [isMemberSelected, setIsMemberSelected] = useState('');

  const updateUserRole = (userId, newRole) => {

    changUserRole(userId, newRole)
      .then((res) => {
        if (res) {

          dispatch({ type: reducerCases.UPDATE_USER_ROLE, userId, newRole });

          getAllUsers()
            .then((data) => {
              dispatch({ type: reducerCases.SET_USERS, users: data.data });
            })
            .catch((error) => {
              console.error('Error fetching updated user list:', error);
            });
        } else {
          console.error('Failed to update user role on server.');
        }
      })
      .catch((error) => {
        console.error('Error updating user role:', error);
      });
  };


  const handleRoleClick = () => {
    setIsMemberSelected(!isMemberSelected);
  };

  return (
    <tr>
      <td className={styles.cellContent}><img src={user.image} alt="userImg" /></td>
      <td className={styles.cellContent}>{user.name}</td>
      <td className={styles.cellContent}>{user.email}</td>
      <td className={styles.cellContent}>{user.emailVerified ? "true" : "false"}</td>
      <td className={styles.cellContent}>{user.createdAt}</td>
      <td className={styles.tdRoll}>
        {user.role}
        <span onClick={handleRoleClick} className={styles.role}>
          {user.role === 'admin' ? "Member" : "Admin"}
        </span>
        {isMemberSelected && (
          <div className={styles.absolute}>
            {
              user.role === 'admin' ? " Are you sure you want to select this user as an member?" : "Are you sure you want to select this user as an admin?"
            }
            <div>
              <button onClick={() => updateUserRole(user._id, user.role === "admin" ? "member" : "admin")}>yes</button>
              <button onClick={() => setIsMemberSelected(false)}>no</button>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
}
