import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cashgrabstudios.graphMaker',
  appName: 'Graph Maker',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
