import { useI18n } from '@react-ssr/i18n';
import { Button } from '@react-ssr/ui-components';
import React, { FC } from 'react';

const LangSwitcher: FC = () => {
  const { lang, setLang } = useI18n();

  const switchLang = (): void => {
    const newLang = lang === 'en' ? 'cs' : 'en';
    setLang(newLang);
  };

  return (
    <>
      <div className="mr-3" style={{ width: '120px', display: 'inline-block' }}>
        {`LangSwitcher: ${lang}`}
      </div>
      <Button onClick={switchLang}>Switch</Button>
    </>
  );
};

export default LangSwitcher;
