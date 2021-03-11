import React, { FC } from 'react';

import styles from './Test.module.scss';

const Test: FC = () => {
  return (
    <>
      <div className={styles.test}>{styles.width}</div>
    </>
  );
};

export default Test;
