import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Animated,
} from 'react-native';
import {STYLES} from '../../styles/index';
import {useTheme} from '../../context/AppProvider';

const LoadingScreen = () => {
  const appTheme = useTheme();
  const theme = STYLES[appTheme];
  // Initialize animation state
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [fadeAnim]);

  return (
    <View style={[theme.con, styles.container]}>
      {/* Logo or Text with Fading Animation */}
      <Animated.View style={{opacity: fadeAnim}}>
        <Text style={styles.logoText}>Aegis</Text>
      </Animated.View>

      {/* Loading Spinner */}
      <ActivityIndicator size="large" color="#ffffff" style={styles.spinner} />

      {/* Loading Message */}
      <Text style={styles.loadingText}>Loading, please wait...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  spinner: {
    marginVertical: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#ffffff',
  },
});

export default LoadingScreen;
