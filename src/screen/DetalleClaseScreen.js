import React, { useState, useMemo, useLayoutEffect } from 'react';
import { View, Text, TextInput, Alert, ScrollView, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ioncons } from '@expo/vector-icons';
import useResponsive from '../hooks/useResponsive';
import { colors, spacing, radius, typography } from '../theme';
import { formatearPrecio } from '../data/clases';

export default function DetalleClaseScreen({ route, navigation }) {
    const insets = useSafeAreaInsets();
    const {clase} = route.params;
    const { isTablet } = useResponsive();

    useLayoutEffect(()=>{
        //unicamente se usara cuando haya apartado de navegacion
        navigation.setOptions({title: clase.titulo});
    },[navigation, clase.titulo])

    return (
        <View style={styles.pantalla}> 
            <ScrollView
            contentContainerStyle={{paddingBottom: 120}}
            showsVerticalScrollIndicator={false}
            > 
                <image
                    source={{uri: clase.imagen}}
                    style={[styles.portada, { height: isTablet ? 380: 200}]}
                    resizeMode="cover"
                />
                /**nombre del profesor completo | al lado la foto
                descripcion
                precio
                duracion
                cupos
                horario
                boton: que se llame realizar reserva*/

                // objectivo: emule, me sale la tarjeta, 
                //selecciono la tarjeta, y nos lleva a lo que se termino de completar
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    pantalla: { flex: 1, backgroundColor: colors.fondo },
    portada: { width: '100%', backgroundColor: colors.primarioSuave },
    datos: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: colors.superficie,
        borderRadius: radius.lg,
        paddingVertical: spacing.lg,
    },
    dato: { alignItems: 'center', gap: 2 },
    datoValor: { fontSize: 16, fontWeight: '800', color: colors.texto },
    profesor: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        backgroundColor: colors.superficie,
        borderRadius: radius.lg,
        padding: spacing.lg,
    },
    avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.borde },
    profesorNombre: { fontSize: 15, fontWeight: '700', color: colors.texto },
    descripcion: { ...typography.cuerpo, color: colors.textoSuave, lineHeight: 22, marginTop: spacing.sm },
    barra: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.superficie,
        borderTopWidth: 1,
        borderTopColor: colors.borde,
        paddingVertical: spacing.lg,
        paddingTop: spacing.lg
    },
    precio: { fontSize: 18, fontWeight: '800', color: colors.primario },
});
