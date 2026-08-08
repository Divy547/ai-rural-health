import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra;

const googleWebClientId =
  extra?.googleWebClientId;

const googleAndroidClientId =
  extra?.googleAndroidClientId;

if (!googleWebClientId) {
  throw new Error(
    'Google Web Client ID is not configured.',
  );
}

if (!googleAndroidClientId) {
  throw new Error(
    'Google Android Client ID is not configured.',
  );
}

export const GOOGLE_WEB_CLIENT_ID =
  googleWebClientId as string;

export const GOOGLE_ANDROID_CLIENT_ID =
  googleAndroidClientId as string;