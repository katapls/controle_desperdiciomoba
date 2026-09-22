import { useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import SesiLogo from '../components/SesiLogo';

export default function Login({ onCreateAccount, onLogin }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');

	function handleLogin() {
		if (!email || !password) {
			setMessage('Preencha seu e-mail e sua senha para entrar.');
			return;
		}
		setMessage('');
		onLogin();
	}

	return (
		<KeyboardAvoidingView
			style={styles.screen}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
		>
			<ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
				<View style={styles.topLine} />
				<View style={styles.brandRow}>
					<View style={styles.brandIcon}><SesiLogo /></View>
					<Text style={styles.brandSub}>CONTROLE DE DESPERDÍCIO</Text>
				</View>

				<View style={styles.form}>
					<Text style={styles.label}>E-MAIL</Text>
					<TextInput
						autoCapitalize="none"
						keyboardType="email-address"
						placeholder="nome@sesisp.edu.br"
						placeholderTextColor="#9B9B96"
						style={styles.input}
						value={email}
						onChangeText={setEmail}
					/>
					<View style={styles.fieldGap} />
					<View style={styles.passwordHeader}>
						<Text style={styles.label}>SENHA</Text>
						<Pressable onPress={() => setMessage('Entre em contato com o administrador da sua unidade.')}>
							<Text style={styles.forgot}>Esqueci minha senha</Text>
						</Pressable>
					</View>
					<TextInput
						placeholder="Digite sua senha"
						placeholderTextColor="#9B9B96"
						secureTextEntry
						style={styles.input}
						value={password}
						onChangeText={setPassword}
					/>
					{!!message && <Text style={styles.message}>{message}</Text>}
					<Pressable style={styles.primaryButton} onPress={handleLogin}>
						<Text style={styles.primaryButtonText}>ENTRAR</Text>
						<Text style={styles.buttonArrow}>→</Text>
					</Pressable>
				</View>

				<View style={styles.signupRow}>
					<Text style={styles.signupText}>Ainda não tem uma conta?</Text>
					<Pressable onPress={onCreateAccount}><Text style={styles.signupLink}>Crie uma</Text></Pressable>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	screen: { flex: 1, backgroundColor: '#F8F8F6' },
	content: { flexGrow: 1, paddingHorizontal: 28, paddingTop: 52, paddingBottom: 28 },
	topLine: { width: 44, height: 4, borderRadius: 2, backgroundColor: '#B51E2A', marginBottom: 27 },
	brandRow: { flexDirection: 'row', alignItems: 'center' },
	brandIcon: { marginRight: 11 },
	brand: { color: '#1E1E1C', fontSize: 19, fontWeight: '800', letterSpacing: 3 },
	brandSub: { color: '#8C8C86', fontSize: 13, fontWeight: '700', letterSpacing: 1.1, marginTop: 2 },
	form: { marginTop: 52 },
	label: { color: '#6F6F69', fontSize: 10, fontWeight: '800', letterSpacing: 1.1 },
	input: { height: 52, borderBottomWidth: 1, borderBottomColor: '#D7D7D0', color: '#282825', fontSize: 15, paddingVertical: 13 },
	fieldGap: { height: 24 },
	passwordHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
	forgot: { color: '#B51E2A', fontSize: 11, fontWeight: '700' },
	message: { color: '#B51E2A', fontSize: 12, lineHeight: 17, marginTop: 14 },
	primaryButton: { height: 54, borderRadius: 5, backgroundColor: '#B51E2A', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 25 },
	primaryButtonText: { color: '#FFFFFF', fontSize: 12, fontWeight: '800', letterSpacing: 1.2 },
	buttonArrow: { color: '#FFFFFF', fontSize: 22, marginLeft: 14, marginTop: -2 },
	signupRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 'auto', paddingTop: 42 },
	signupText: { color: '#777771', fontSize: 13 },
	signupLink: { color: '#B51E2A', fontSize: 13, fontWeight: '800', marginLeft: 5 },
});
