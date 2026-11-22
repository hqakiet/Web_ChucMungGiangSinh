import { useEffect } from 'react';
import { appMarkup } from './appMarkup';
import { appStyles } from './styles';
import { initLegacyApp } from './legacyApp';

export default function App() {
  useEffect(() => {
    initLegacyApp();
  }, []);

  return (
    <>
      <style>{appStyles}</style>
      <div dangerouslySetInnerHTML={{ __html: appMarkup }} />
    </>
  );
}
