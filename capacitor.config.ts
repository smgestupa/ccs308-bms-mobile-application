import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bms.application',
  appName: 'Book Management System',
  webDir: 'build',
  plugins: {
    "SplashScreen": {
      "launchShowDuration": 0
    }
  },
  server: {
    androidScheme: 'https',
    cleartext: true
  },
};

export default config;
