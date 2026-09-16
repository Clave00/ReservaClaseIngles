import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, FlatList, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import useResponsive from '../hooks/useResponsive';
import Card from '../components/Card';
import NivelFiltro from '../components/NivelFiltro';
import EstadoVacio from '../components/EstadoVacio';
import { colors, spacing, radius, typography } from '../theme';
import { CLASES, NIVELES } from '../data/clases';

export default function ClasesScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { columnas, paddingHorizontal } = useResponsive();

    const [nivel, setNivel] = useState('Todos');
    const [busqueda, setBusqueda] = useState('');

    const resultados = useMemo(() => {
        const textoBusqueda = busqueda.trim().toLowerCase();
        return CLASES.filter((clase) => {
            const coincideNivel = nivel === 'Todos' || clase.nivel === nivel;
            const coincideTestoBusqueda =
                textoBusqueda === '' ||
                clase.titulo.toLowerCase().includes(textoBusqueda) ||
                clase.profesor.nombre.toLowerCase().includes(textoBusqueda);
            return coincideNivel && coincideTestoBusqueda;
        });
    }, [nivel, busqueda]);

    return (
        <View style={[style.pantalla, { paddingTop: insets.top + spacing.md }]}>
            <View style={{ paddingHorizontal }}>
                <Text style={typography.titulo}>Aplicación de clases de inglés</Text>

                <View style={style.buscador}>
                    <Ionicons name="search" size={18} color={colors.texto} />
                    <TextInput
                        style={style.input}
                        placeholder="Buscar por nivel o profesor"
                        value={busqueda}
                        onChangeText={setBusqueda}
                        autoCorrect={false}
                        autoComplete="off"
                    />
                    {busqueda.length > 0 && (
                        <Ionicons
                            name="close-circle"
                            size={18}
                            color={colors.texto}
                            onPress={() => setBusqueda('')}
                        />
                    )}
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: spacing.md }}
                >
                    {NIVELES.map((item) => (
                        <NivelFiltro
                            key={item}
                            etiqueta={item}
                            activo={nivel === item}
                            onPress={() => setNivel(item)}
                        />
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={resultados}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card
                        clase={item}
                        onPress={() =>
                            navigation.navigate('DetalleClase', { clase: item })
                        }
                    />
                )}
                numColumns={columnas}
                key={columnas}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal,
                    flexGrow: 1,
                    paddingBottom: spacing.xl,
                }}
                ListEmptyComponent={
                    <EstadoVacio
                        icono="search-outline"
                        titulo="No se encontraron valores de búsqueda"
                        mensaje="Prueba con otro valor de búsqueda o cambia las palabras"
                        textoAccion="Quitar filtro"
                        onAction={() => {
                            setNivel('Todos');
                            setBusqueda('');
                        }}
                    />
                }
            />
        </View>
    );
}

const style = StyleSheet.create({
    pantalla: { flex: 1, backgroundColor: colors.fondo },
    buscador: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        backgroundColor: colors.superficie,
        borderRadius: radius.md,
        paddingHorizontal: spacing.lg,
        height: 46,
        marginTop: spacing.lg,
        borderWidth: 1,
        borderColor: colors.borde,
    },
    input: { flex: 1, fontSize: 14, color: colors.texto, paddingVertical: 0 },
});