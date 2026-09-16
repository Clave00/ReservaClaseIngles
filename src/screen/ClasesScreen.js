import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, FlatList, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';

import useResponsive from '../hooks/useResponsive';
import Card from '../components/Card';
import NivelFiltro from '../components/NivelFiltro';
import { colors, spacing, radius, typography } from '../theme';
import { CLASES, NIVELES } from '../data/clases';

export default function ClasesScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { columnas, paddingHorizontal } = useResponsive();

    const [nivel, setNivel] = useState('Todos');
    const [busqueda, setBusqueda] = useState('');
    const resultados = useMemo(()=> {
        const textoBusqueda = busqueda.trim().toLowerCase();
        return CLASES.ilter((clase) => {
            const coincideNivel = nivel === 'Todos' || clase.nivel === nivel;
            const coincideTestoBusqueda = textoBusqueda === '' || 
            clase.titulo.toLowerCase().includes(textoBusqueda) ||
            clase.profesor.nombre.toLowerCase().includes(textoBusqueda);
            return coincideNivel && coincideTestoBusqueda;
        })

    }, [nivel, busqueda]);

    return (
        <View style={[style.pantalla, { paddingTop: insets.top + spacing.md }]}>
            <View style={{ paddingHorizontal }}>
                <Text style={typography.titulo}> Aplicacion de clases de ingles </Text>
            </View>
            <View style={style.buscador}>
                <Ionicons name="search" size={18} />
                <TextInput
                    placeholder='Buscar por nivel o profesor'
                    value={busqueda}
                    onChangeText={setBusqueda}
                    autoCorrect={false}
                    autoComplete="off"
                />
                {busqueda.length > 0 && (
                    <Ionicons
                        name="close-circle"
                        size={18}
                        onPress={() => setBusqueda('')}
                    />
                )}
            </View>
            <ScrollView
                style={{ flexGrow: 0 }}
            >
                {/** repasar el metodo .map de js */}
                <ScrollView horizontal style={{ flexGrow: 0 }}>
                    {NIVELES.map((item) => (
                        <NivelFiltro
                            etiqueta={item}
                            activo={nivel === item}
                            onPress={() => setNivel(item)}
                        />
                    ))
                    }
                </ScrollView>
                <FlatList
                    data={resultados}
                    keyExtractor={(item) => item.id} //aprenderlo de memoria
                    renderItem={({ item }) => (
                        <Card
                            clase={item}
                            onPress={() =>
                                navigation.navigate('DetalleClase', {clase: item})
                            }
                        />
                    )}
                    numColumns={columnas}
                    showVerticalScrollIndicator={false}
                    contentContainerStyle ={{ paddingHorizontal, flexGrow: 1,
                        paddingBottom: spacing.xl
                    }}
                    ListEmptyComponent={
                        <EstadoVacio
                            icono="search-outline"
                            titulo="No se encontraron valores de busqueda"
                            mensaje="Prueba con otro valor de busqueda o cambia las palabras"
                            textoAccion="Quitar filtro"
                            onAction={() => {
                                setNivel('Todos');
                                setBusqueda('');
                            }}
                        />
                    }
                />
            </ScrollView>
        </View>
    )
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