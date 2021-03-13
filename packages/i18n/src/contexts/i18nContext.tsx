import React, { createContext, FC, ReactNode, useContext, useState } from 'react';

export interface I18n {
  lang: string;
  setLang: (lang: string) => void;
  t: () => string;
}

export const I18nContext = createContext<I18n | undefined>(undefined);

export interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: FC<ReactNode> = ({ children }) => {
  const [lang, setLang] = useState('en');

  const value = {
    lang,
    setLang,
    t: () => 'string'
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18n => {
  const i18n = useContext(I18nContext);
  if (!i18n) throw new Error('useI18n needs to be used inside I18nProvider');
  return i18n;
};
