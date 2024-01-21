import { Feather } from '@expo/vector-icons';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { useFonts } from 'expo-font';
import { Stack, useRouter, SplashScreen } from 'expo-router';
import React, { useEffect } from 'react';
import { TamaguiProvider, Button, Text, View } from 'tamagui';

import db from '../db';
import migrations from '../db/drizzle/migrations';
import config from '../tamagui.config';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const { success, error } = useMigrations(db, migrations);
  const router = useRouter();

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded || success) {
      SplashScreen.hideAsync();
    }
  }, [loaded, success]);

  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!loaded || !success) return null;

  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <Stack
        screenOptions={{
          headerTitleAlign: 'center',
          animation: 'slide_from_right',
          animationDuration: 200,
        }}>
        <Stack.Screen name="index" options={{ title: 'Found You' }} />
      </Stack>
    </TamaguiProvider>
  );
}
