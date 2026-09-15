import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/Card';
import NivelFiltro from '../components/NivelFiltro';
import { colors, spacing, typography } from '../theme';
import { CLASES, NIVELES } from '../data/clases';


export default function ClasesScreen({ navigation }) {
    // const {columnas, paddingHorizontal} = useReponsive();
    const [nivel, setNivel] = useState('Todos');
    const [busqueda, setBusqueda] = useState('');

    return (
        <View>
            <View>
                <Text> Aplicacion de clases de ingles </Text>
                <View>
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
                {/** debajo de este colocar card y luego el flylist */}
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
                        ))}
                    </ScrollView>
                </ScrollView>
            </View>
        </View>
    )
}