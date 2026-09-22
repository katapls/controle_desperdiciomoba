import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import SesiLogo from '../components/SesiLogo';

export default function Inicio({ onLogout }) {
	return (
		<ScrollView style={styles.screen} contentContainerStyle={styles.content}>
			<View style={styles.header}>
				<SesiLogo />
				<Pressable onPress={onLogout} style={styles.logoutButton}>
					<Text style={styles.logoutText}>Sair</Text>
				</Pressable>
			</View>

			<Text style={styles.greeting}>Início</Text>
			<Text style={styles.subtitle}>Controle de desperdício</Text>

		</ScrollView>
	);
}

const styles = StyleSheet.create({
	screen: { flex: 1, backgroundColor: '#F8F8F6' },
	content: { paddingHorizontal: 28, paddingTop: 52, paddingBottom: 32 },
	header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
	logoutButton: { borderWidth: 1, borderColor: '#D7D7D0', borderRadius: 5, paddingHorizontal: 16, paddingVertical: 9 },
	logoutText: { color: '#B51E2A', fontSize: 13, fontWeight: '700' },
	greeting: { color: '#242422', fontSize: 32, fontWeight: '800', marginTop: 58 },
	subtitle: { color: '#777771', fontSize: 15, marginTop: 5 },
});
