import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useAlmacenamiento(clave, valorInicial) {
    const [valor, setValor] = useState(valorInicial);
    const [listo, setListo] = useState(false);

    useEffect(() => { //useEffect inicialmente
        let activo = true; //Esto es una bandera para saber si estoy guardando el componente o montando el componente

        AsyncStorage.getItem(clave)
            .then((guardando) => {
                if (activo && guardando !== null) setValor(JSON.parse(guardando));
            }) // funciona como trycas
            .catch((error) => console.log('Error leyendo' + clave, error))
            .finally(() => activo && setListo(true)); //solo resetea la bandera de guardado y y el set listo ponerlo en tru

        return () => {
            activo = false;
        };
    }, [clave]);

    const actualizar = useCallback(
        async (nuevoValor) => {
            setValor(nuevoValor);
            try {
                await AsyncStorage.setItem(clave, JSON.stringify(nuevoValor));
            } catch (error) {
                console.log('Error Guardando' + clave, error);
            }
        }, [clave]
    );

    return { valor, listo, actualizar };
}