'use client';

import style from './logoutButton.module.css';
import { signOut, useSession } from 'next-auth/react';

export default function LogoutButton() {
  const { data: me } = useSession();

  const onLogout = async () => {
    await signOut();
  };

  if (!me?.user) {
    return null;
  }

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.user.image || ''} alt={me.user.email || ''} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user.name}</div>
        <div>@{me.user.email}</div>
      </div>
    </button>
  );
}
