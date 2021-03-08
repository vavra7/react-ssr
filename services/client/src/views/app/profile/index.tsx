import { RouterView } from '@react-ssr/router';
import React, { FC } from 'react';

const Profile: FC = () => {
  return (
    <>
      <h1>Profile</h1>
      <RouterView />
    </>
  );
};

export default Profile;
