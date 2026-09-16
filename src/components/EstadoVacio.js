import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../theme';

export default function EstadoVacio({
    icono = 'search-outline',
    titulo,
    mensaje,
    textoAccion,
    onAction,
    onAccion,
}) {
    const handleAction = onAction || onAccion;

    return (
        <View style={style.contenedor}>
            <View style={style.circulo}>
                <Ionicons name={icono} size={30} color={colors.primario} />
            </View>
            <Text style={style.titulo}>{titulo}</Text>
            <Text style={style.mensaje}>{mensaje}</Text>

            {textoAccion && handleAction && (
                <Pressable style={style.boton} onPress={handleAction}>
                    <Text style={style.textoBoton}>{textoAccion}</Text>
                </Pressable>
            )}
        </View>
    );
}

const style = StyleSheet.create({
    contenedor: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.xl,
    },
    circulo: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: colors.primarioSuave,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.lg,
    },
    titulo: {
        fontSize: 17,
        fontWeight: '700',
        color: colors.texto,
        textAlign: 'center',
    },
    mensaje: {
        fontSize: 14,
        color: colors.textoSuave || colors.texto,
        textAlign: 'center',
        marginTop: spacing.sm,
        lineHeight: 20,
    },
    boton: {
        marginTop: spacing.lg,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        backgroundColor: colors.primario,
        borderRadius: 8,
    },
    textoBoton: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 14,
    },
});