import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import EtiquetaNivel from './EtiquetaNivel';
import { spacing, colors, radius, typography } from '../theme';

export default function Card({ clase, onPress }) {
    return (
        <Pressable style={styles.card} onPress={onPress}>
            {clase.imagen && (
                <Image
                    source={{ uri: clase.imagen }}
                    style={styles.imagen}
                />
            )}
            <View style={styles.contenido}>
                <EtiquetaNivel nivel={clase.nivel} />
                <Text style={styles.titulo}>{clase.titulo}</Text>
                {/* Puedes agregar más información aquí (precio, docente, etc.) */}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.superficie,
        borderRadius: radius.md,
        overflow: 'hidden',
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.borde,
    },
    imagen: {
        width: '100%',
        height: 140,
    },
    contenido: {
        padding: spacing.md,
        gap: spacing.xs,
    },
    titulo: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.texto,
        marginTop: spacing.xs,
    },
});