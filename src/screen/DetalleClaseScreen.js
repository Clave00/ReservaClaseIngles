import React, { useLayoutEffect } from 'react';
import { View, ScrollView, StyleSheet, Image, Text, Pressable, BackHandler } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import useResponsive from '../hooks/useResponsive';
import { colors, spacing, radius, typography } from '../theme';
import { formatearPrecio } from '../data/clases';

export default function DetalleClaseScreen({ route, navigation }) {
    const insets = useSafeAreaInsets();
    const { clase } = route.params;
    const { isTablet } = useResponsive();

    useLayoutEffect(() => {
        // unicamente se usara cuando haya apartado de navegacion
        navigation.setOptions({ title: clase.titulo });
    }, [navigation, clase.titulo]);

    return (
        <View style={styles.pantalla}>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            >
                <Image
                    source={{ uri: clase.imagen }}
                    style={[styles.portada, { height: isTablet ? 380 : 200 }]}
                    resizeMode="cover"
                />
                {/**nombre del profesor completo | al lado la foto ✅ */}
                <View style={styles.profesor}>
                    <Image
                        source={{ uri: clase.profesor.foto }}
                        style={styles.avatar}
                        resizeMode="cover"
                    />
                    <Text style={styles.profesorNombre}>
                        {clase.profesor.nombre}
                    </Text>
                </View>
                {/**descripcion ✅✅*/}
                <View>
                    <Text style={styles.descripcion}>
                        {clase.descripcion}
                    </Text>
                </View>
                {/*duracion ✅✅*/}
                <View style={styles.datos}>
                    <View style={styles.dato}>
                        <Text style={styles.descripcion}>
                            Duracion
                        </Text>
                        <Text style={styles.datoValor}>
                            {clase.duracion} Min
                        </Text>
                    </View>
                    {/*precio ✅✅*/}
                    <View style={styles.dato}>
                        <Text style={styles.descripcion}>
                            Precio
                        </Text>
                        <Text style={styles.datoValor}>
                            {formatearPrecio(clase.precio)}
                        </Text>
                    </View>
                    {/*cupos ✅✅*/}
                    <View style={styles.dato}>
                        <Text style={styles.descripcion}>
                            Cupos
                        </Text>
                        <Text style={styles.datoValor}>
                            {clase.cupos}
                        </Text>
                    </View>
                </View>
                {/*horario ✅✅*/}
                <View style={styles.datos}>
                    <View style={styles.dato}>
                        <Text style={styles.descripcion}>
                            Horarios
                        </Text>
                        <Text style={styles.datoValor}>
                            {clase.horarios.join('|||')}
                        </Text>
                    </View>
                </View>
                {/*
                boton: que se llame realizar reserva
                */}

                {/* 
                objectivo: emule, me sale la tarjeta, 
                selecciono la tarjeta, y nos lleva a lo que se termino de completar
                */}
            </ScrollView>

            <View style={styles.barra}>
                <Text style={styles.precio}>
                    {formatearPrecio(clase.precio)}
                </Text>
                <Pressable style={styles.reserva} onPress={() => { }}>
                    <Text style={styles.datoValor}>Reservar</Text>
                </Pressable>
            </View>
        </View>
    );
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
    dato: { alignItems: 'center', gap: 3 },
    datoValor: { fontSize: 22, fontWeight: '800', color: colors.texto },
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
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.superficie,
        borderTopWidth: 1,
        borderTopColor: colors.borde,
        paddingVertical: spacing.lg,
        paddingTop: spacing.lg
    },
    precio: { fontSize: 18, fontWeight: '800', color: colors.primario },
    reserva: {
        backgroundColor: colors.primario,
        borderRadius: radius.md,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
    },
});