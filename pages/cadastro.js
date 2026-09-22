import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import SesiLogo from '../components/SesiLogo';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:8000/api';

export default function Cadastro({ onBackToLogin }) {
	const [form, setForm] = useState({
		nome: '',
		email: '',
		data_nascimento: '',
		cpf: '',
		senha: '',
		senha_confirmation: '',
	});
	const [message, setMessage] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	function update(field, value) {
		setForm({ ...form, [field]: value });
		setMessage('');
	}

	function formatBirthDate(value) {
		const digits = value.replace(/\D/g, '').slice(0, 8);
		if (digits.length <= 2) return digits;
		if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
		return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
	}

	function dateForApi(value) {
		const [day, month, year] = value.split('/');
		return `${year}-${month}-${day}`;
	}

	async function handleRegister() {
		if (!form.nome || !form.email || !form.data_nascimento || !form.senha || !form.senha_confirmation) {
			setMessage('Preencha todos os campos obrigatórios.');
			return;
		}
		if (form.senha.length < 6) {
			setMessage('A senha precisa ter pelo menos 6 caracteres.');
			return;
		}
		if (form.senha !== form.senha_confirmation) {
			setMessage('As senhas não conferem.');
			return;
		}

		if (!/^\d{2}\/\d{2}\/\d{4}$/.test(form.data_nascimento)) {
			setMessage('Informe a data no formato DD/MM/AAAA.');
			return;
		}

		setIsSubmitting(true);
		setMessage('');
		try {
			const payload = { ...form, data_nascimento: dateForApi(form.data_nascimento) };
			const response = await fetch(`${API_URL}/cadastro_usuario`, {
				method: 'POST',
				headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});
			const data = await response.json().catch(() => ({}));

			if (!response.ok) {
				const validationErrors = data.errors ? Object.values(data.errors).flat().join(' ') : '';
				throw new Error(validationErrors || data.mensagem || 'Não foi possível realizar o cadastro.');
			}

			setMessage(data.mensagem || 'Cadastro realizado com sucesso.');
			setForm({ nome: '', email: '', data_nascimento: '', cpf: '', senha: '', senha_confirmation: '' });
		} catch (error) {
			setMessage(error.message || 'Não foi possível conectar ao servidor.');
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
			<ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
				<Pressable onPress={onBackToLogin} style={styles.back}><Text style={styles.backArrow}>←</Text><Text style={styles.backText}>Voltar ao login</Text></Pressable>
				<View style={styles.brandRow}><View style={styles.brandIcon}><SesiLogo /></View></View>
				<View style={styles.form}>
					<Text style={styles.label}>NOME COMPLETO</Text>
					<TextInput placeholder="Como podemos chamar você?" placeholderTextColor="#9B9B96" style={styles.input} value={form.nome} onChangeText={(value) => update('nome', value)} />
					<View style={styles.gap} />
					<Text style={styles.label}>E-MAIL</Text>
					<TextInput autoCapitalize="none" keyboardType="email-address" placeholder="nome@sesisp.edu.br" placeholderTextColor="#9B9B96" style={styles.input} value={form.email} onChangeText={(value) => update('email', value)} />
					<View style={styles.gap} />
					<Text style={styles.label}>DATA DE NASCIMENTO</Text>
					<TextInput keyboardType="numeric" maxLength={10} placeholder="DD/MM/AAAA" placeholderTextColor="#9B9B96" style={styles.input} value={form.data_nascimento} onChangeText={(value) => update('data_nascimento', formatBirthDate(value))} />
					<View style={styles.gap} />
					<Text style={styles.label}>CPF <Text style={styles.optional}>OPCIONAL</Text></Text>
					<TextInput keyboardType="numeric" placeholder="000.000.000-00" placeholderTextColor="#9B9B96" style={styles.input} value={form.cpf} onChangeText={(value) => update('cpf', value)} />
					<View style={styles.gap} />
					<Text style={styles.label}>CRIAR SENHA</Text>
					<TextInput placeholder="Mínimo de 6 caracteres" placeholderTextColor="#9B9B96" secureTextEntry style={styles.input} value={form.senha} onChangeText={(value) => update('senha', value)} />
					<View style={styles.gap} />
					<Text style={styles.label}>CONFIRMAR SENHA</Text>
					<TextInput placeholder="Repita sua senha" placeholderTextColor="#9B9B96" secureTextEntry style={styles.input} value={form.senha_confirmation} onChangeText={(value) => update('senha_confirmation', value)} />
					{!!message && <Text style={styles.message}>{message}</Text>}
					<Pressable disabled={isSubmitting} style={[styles.primaryButton, isSubmitting && styles.disabledButton]} onPress={handleRegister}><Text style={styles.primaryButtonText}>{isSubmitting ? 'ENVIANDO...' : 'CRIAR MEU ACESSO'}</Text><Text style={styles.buttonArrow}>→</Text></Pressable>
					<View style={styles.loginRow}>
						<Text style={styles.loginText}>Já possui uma conta?</Text>
						<Pressable onPress={onBackToLogin}><Text style={styles.loginLink}>Entrar agora</Text></Pressable>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	screen: { flex: 1, backgroundColor: '#F8F8F6' },
	content: { flexGrow: 1, paddingHorizontal: 28, paddingTop: 47, paddingBottom: 32 },
	back: { flexDirection: 'row', alignItems: 'center', marginBottom: 31 },
	backArrow: { color: '#B51E2A', fontSize: 22, marginRight: 9 },
	backText: { color: '#777771', fontSize: 13, fontWeight: '600' },
	brandRow: { flexDirection: 'row', alignItems: 'center' },
	brandIcon: { marginRight: 11 },
	brand: { color: '#1E1E1C', fontSize: 19, fontWeight: '800', letterSpacing: 3 },
	form: { marginTop: 42 },
	label: { color: '#6F6F69', fontSize: 10, fontWeight: '800', letterSpacing: 1.1 },
	optional: { color: '#9B9B96', fontSize: 9, fontWeight: '600', letterSpacing: 0 },
	input: { height: 43, borderBottomWidth: 1, borderBottomColor: '#D7D7D0', color: '#282825', fontSize: 14, paddingVertical: 9 },
	gap: { height: 17 },
	message: { color: '#B51E2A', fontSize: 12, lineHeight: 17, marginTop: 13 },
	primaryButton: { height: 54, borderRadius: 5, backgroundColor: '#B51E2A', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 22 },
	disabledButton: { opacity: 0.65 },
	primaryButtonText: { color: '#FFFFFF', fontSize: 12, fontWeight: '800', letterSpacing: 1.1 },
	buttonArrow: { color: '#FFFFFF', fontSize: 22, marginLeft: 14, marginTop: -2 },
	loginRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 24, paddingBottom: 4 },
	loginText: { color: '#777771', fontSize: 13 },
	loginLink: { color: '#B51E2A', fontSize: 13, fontWeight: '800', marginLeft: 5 },
});
