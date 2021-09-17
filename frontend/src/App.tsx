import React, { useEffect, useState } from 'react';
import CalculatorDesktop from './pages/CalculatorDesktop';
import CalculatorMobile from './pages/CalculatorMobile';

function App() {

  const [isMobile, setisMobile] = useState<boolean>()

  const handleResize = () => {
    setisMobile(window.innerWidth < 769);
  }

    useEffect(() => {
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => {
        window.addEventListener('resize', () => {});
      }
    }, []);

  return (
    <>
    {
      (isMobile) ? <CalculatorMobile />: <CalculatorDesktop />
    }
    </>
  );
}

export default App;
