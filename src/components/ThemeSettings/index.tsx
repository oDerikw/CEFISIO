import { FC, useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from 'src/theme/ThemeProvider';
import { useTranslation } from 'react-i18next';

const ThemeSettings: FC = () => {

  const setThemeName = useContext(ThemeContext);

  useEffect(() => {
    const curThemeName =
      window.localStorage.getItem('appTheme') || 'PureLightTheme';
    setTheme(curThemeName);
  }, []);

  const [theme, setTheme] = useState('PureLightTheme');

  const changeTheme = (theme): void => {
    setTheme(theme);
    setThemeName(theme);
  };

  return (
    <>
    </>
  );
};

export default ThemeSettings;
