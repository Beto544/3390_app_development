import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const Notification = ({ message, isVisible, hideNotification }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        // Automatically hide the notification after a certain duration (e.g., 3000ms)
        setTimeout(() => {
          hideNotification();
        }, 3000);
      });
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isVisible, fadeAnim, hideNotification]);

  return (
    <Animated.View style={[styles.notificationContainer, { opacity: fadeAnim }]}>
      <Text style={styles.notificationText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  notificationText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Notification;
