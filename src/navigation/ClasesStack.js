import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ClasesScreen from '../screen/ClasesScreen';
import {colors} from '../theme';
import DetalleClaseScreen from '../screen/DetalleClaseScreen';


const Stack = createNativeStackNavigator();

export default function ClasesStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={ClasesScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="DetalleClase"
                component={DetalleClaseScreen}
                options={{title: 'Detalle', headerBackTitle: 'Atras'}}
            />
        </Stack.Navigator>
    )
}