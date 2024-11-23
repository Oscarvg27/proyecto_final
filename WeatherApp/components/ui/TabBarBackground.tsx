import React from 'react';
import { View, StyleSheet } from 'react-native';

const TabBarBackground = () => (
  <View style={styles.background} />
);

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    flex: 1,
  },
});

export default TabBarBackground;
