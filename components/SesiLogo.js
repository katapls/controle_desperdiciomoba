import { Svg, Rect, Text as SvgText } from 'react-native-svg';

export default function SesiLogo() {
	return (
		<Svg width="38" height="38" viewBox="0 0 38 38" accessibilityLabel="Logo SESI">
			<Rect width="38" height="38" rx="10" fill="#B51E2A" />
			<SvgText x="5" y="24" fill="#FFFFFF" fontSize="11" fontWeight="800" letterSpacing="0.4">SESI</SvgText>
		</Svg>
	);
}
