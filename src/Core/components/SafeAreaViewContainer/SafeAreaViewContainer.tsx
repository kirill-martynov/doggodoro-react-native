import * as React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

interface IProps {
  children: React.ReactNode;
}

export const SafeAreaViewContainer: React.FC<IProps> = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
