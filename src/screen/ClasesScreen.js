import React, {useState} from 'react';
import { View, Text, TextInput,FlatList, ScrollView,  StyleSheet } from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';

import Card from '../components/Card';
import { colors, spacing, typography } from '../theme';
import {CLASES, NIVELES} from '../data/clases';
import { useState } from 'react';

export default function ClasesScreen({navigation}) {
    // const {columnas, paddingHorizontal} = useReponsive();
    const [nivel, setNivel] = useState('')

    return (
        <View>
            <View>
                <Text> Aplicacion de clases de ingles </Text>
                <View>
                    <Ionicons name="search" size={18}/>
                    <TextInput 
                    placeholder= 'Buscar por nivel o profesor'
                    value={nivel}
                    onChangeText={setNivel}
                    autoCorrect={False}
                    />
                </View> //debajo de este colocar card y luego el flylist
            </View>
        </View>

    )
}