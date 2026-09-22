import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './pages/login';
import Cadastro from './pages/cadastro';
import Inicio from './pages/inicio';

export default function App() {
  const [screen, setScreen] = useState('splash');

  useEffect(() => {
    const timer = setTimeout(() => setScreen('login'), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (screen === 'splash') {
    return (
      <View style={styles.splash}>
        <Text style={styles.sesiLogo}>SESI</Text>
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <View style={styles.app}>
      {screen === 'login' && (
        <Login onCreateAccount={() => setScreen('cadastro')} onLogin={() => setScreen('inicio')} />
      )}
      {screen === 'cadastro' && <Cadastro onBackToLogin={() => setScreen('login')} />}
      {screen === 'inicio' && <Inicio onLogout={() => setScreen('login')} />}
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#F8F8F6',
  },
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B51E2A',
  },
  sesiLogo: {
    color: '#FFFFFF',
    fontSize: 58,
    fontWeight: '900',
    letterSpacing: 8,
  },
});
