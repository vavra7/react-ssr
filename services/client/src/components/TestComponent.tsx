import { useRouter } from '@react-ssr/router';
import React, { FC } from 'react';

const TestComponent: FC = () => {
  const router = useRouter();
  const onClick = (): void => {
    router.locationHook();
  };
  return (
    <>
      <div>test component</div>
      <button onClick={onClick}>test router</button>
    </>
  );
};

export default TestComponent;
