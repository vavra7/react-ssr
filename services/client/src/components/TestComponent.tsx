import { useRouter } from '@react-ssr/router';
import React, { FC } from 'react';

const TestComponent: FC = () => {
  const router = useRouter();
  const onClick = (): void => {
    console.log(router.routesConfig);
  };
  return (
    <>
      <div>test component</div>
      <button onClick={onClick} type="button">
        test router
      </button>
    </>
  );
};

export default TestComponent;
