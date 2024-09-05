'use client';

import { createContext, useEffect, useState } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export const DeviceContext = createContext<DeviceType>('desktop');

export const DeviceProvider = ({ children }: { children: React.ReactNode }) => {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  const getDeviceType = () => {
    const userAgent = window.navigator.userAgent;
    const isMobile = /Mobi/i.test(userAgent);
    const isTablet = /Tablet|iPad/i.test(userAgent);

    if (isMobile) {
      return 'mobile';
    }
    if (isTablet) {
      return 'tablet';
    }
    return 'desktop';
  };

  useEffect(() => {
    setDeviceType(getDeviceType());

    const handleResize = () => {
      setDeviceType(getDeviceType());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <DeviceContext.Provider value={deviceType}>
      {children}
    </DeviceContext.Provider>
  );
};
