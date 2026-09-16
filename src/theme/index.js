import { Platform } from "react-native";

export const colors = {
    fondo: 'F6F7FB',
    primario: '4f46e5',
    texto: '#111827',
    border: '#e5e7eb'
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
};

export const radius = {
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
};

export const typography = {
    titulo: {fontSize: 26, fontWeight: '800', color: colors.texto},
    subtitulos: {fontSize: 18, fontWeight: '600', color: colors.texto}
};

export default {colors, spacing, typography};