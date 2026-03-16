import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getRemoteConfig, fetchAndActivate, getValue } from 'firebase/remote-config';
import { app } from '../firebase';

const RemoteConfigContext = createContext<any>(null);

export function ABTestingProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<any>({});

  useEffect(() => {
    const remoteConfig = getRemoteConfig(app);
    remoteConfig.settings.minimumFetchIntervalMillis = 3600000; // 1 hour

    fetchAndActivate(remoteConfig).then(() => {
      setConfig({
        headline: getValue(remoteConfig, 'headline').asString(),
        cta: getValue(remoteConfig, 'cta').asString(),
      });
    });
  }, []);

  return (
    <RemoteConfigContext.Provider value={config}>
      {children}
    </RemoteConfigContext.Provider>
  );
}

export const useABTesting = () => useContext(RemoteConfigContext);
