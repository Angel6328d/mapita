import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")} 
        style={styles.logo}
      />
      <Text style={styles.title}>Rincones Mágicos</Text>
      <Text style={styles.text}>
        Rincones Mágicos es una increíble aplicación que te permite explorar
        la belleza de Yucatán a través de sus Pueblos Mágicos. Aprende, descubre
        y planea tus viajes con facilidad.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});