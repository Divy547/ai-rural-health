import * as Device from 'expo-device';
import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Platform,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import {
  GOOGLE_WEB_CLIENT_ID,
} from '@/config/google';
import { API_BASE_URL } from '@/config/api';
import {
  BottomTabInset,
  MaxContentWidth,
  Spacing,
} from '@/constants/theme';



export default function HomeScreen() {
  const [isSigningIn, setIsSigningIn] =
    useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
      scopes: ['openid', 'email', 'profile'],
    });
  }, []);

  async function handleGoogleSignIn() {
    if (Platform.OS !== 'android') {
      Alert.alert(
        'Android test only',
        'We are testing Google Sign-In on Android first.',
      );

      return;
    }

    try {
      setIsSigningIn(true);

      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const response =
        await GoogleSignin.signIn();

      if (response.type !== 'success') {
        return;
      }

      const { idToken } =
        await GoogleSignin.getTokens();

      if (!idToken) {
        throw new Error(
          'Google did not return an ID token.',
        );
      }

      console.log(
        '[GOOGLE AUTH] ID token received',
      );


      const backendResponse = await fetch(
        `${API_BASE_URL}/api/v1/auth/google`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idToken,
          }),
        },
      );

      const result =
        await backendResponse.json();

      console.log(
        '[GOOGLE AUTH] Backend response',
        {
          status: backendResponse.status,
          success: result?.success,
        },
      );

      // console.log(
      //   '[GOOGLE AUTH] Access token received',
      //   result?.data?.accessToken,
      // );

      if (!backendResponse.ok) {
        throw new Error(
          result?.message ??
          'Google authentication failed.',
        );
      }

      Alert.alert(
        'Login successful',
        `Welcome, ${response.data.user.name ??
        response.data.user.email
        }`,
      );
    } catch (error: any) {
      if (
        error?.code ===
        statusCodes.SIGN_IN_CANCELLED
      ) {
        return;
      }

      if (
        error?.code ===
        statusCodes.IN_PROGRESS
      ) {
        return;
      }

      console.error(
        '[GOOGLE AUTH ERROR]',
        error,
      );

      Alert.alert(
        'Google Sign-In failed',
        error?.message ??
        'Unknown Google Sign-In error.',
      );
    } finally {
      setIsSigningIn(false);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <ThemedText
            type="title"
            style={styles.title}
          >
            AI Rural Health
          </ThemedText>

          <ThemedText
            type="code"
            style={styles.code}
          >
            Google Authentication
          </ThemedText>

          <Button
            title={
              isSigningIn
                ? 'Signing in...'
                : 'Continue with Google'
            }
            onPress={handleGoogleSignIn}
            disabled={isSigningIn}
          />
        </ThemedView>

      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },

  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom:
      BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },

  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },

  title: {
    textAlign: 'center',
  },

  code: {
    textTransform: 'uppercase',
  },

  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});