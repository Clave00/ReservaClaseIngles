import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import EtiquetaNivel from './EtiquetaNivel';
import { spacing, colors, typography } from '../theme';
import {clase} from '../data/clases'

export default function Card({clase, onPress}) {
    return(
        <Pressable onPress={onPress}>
            <Image source={{uri: clase.Imagen}}/>
            <View>
                <EtiquetaNivel nivel= {clase.nivel} />
                <Text style={styles.Titulo}>{clase.Titulo}</Text>
                /** se pueden agregar cosas aca a gusto 
                (precio, nivel, docente)*/
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    Titulo: {fontSize: 16, color: colors.texto}
})