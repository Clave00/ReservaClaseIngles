import React, { useState, useEffect, useCallback, useMemo, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_RESERVAS = '@reserva_ingles'

export const ReservasContext = createContext(null);

export function ReservaProvider({ children }) {
    const [reservas, setReservas] = useState([])
    const [cargando, setCargando] = useState(true);

    //Cargar las reservas que tengo guardadas, sino tengo nada me devuelve un arreglo vacio
    useEffect(() => {
        const cargar = async () => {
            try {
                const guardado = await AsyncStorage.getItem(CLAVE_RESERVAS);
                if (guardado !== null) {
                    setReservas(JSON.parse(guardado))
                }
            } catch (error) {
                console.log('Error leyendo reservas: ', error)
            } finally {
                setCargando(false);
            }
        };
        cargar();
    }, [])

    //hacer el guardado

    useEffect(() => {
        if (cargando) return; //evita sobre escribir el arreglo
        AsyncStorage.setItem(CLAVE_RESERVAS, JSON.stringify(reservas)).catch((error) =>
            console.log('Ocurrrio un error guardando la reserva: ', error)
        );
    }, [cargando, reservas]);

    const agregarReserva = useCallback((clase, horario) => {
        const nueva = {
            id: clase.id + '-' + horario,
            titulo: clase.titulo,
            nivel: clase.nivel,
            profesor: clase.profesor.nombre + ' ' + clase.profesor.apellido,
            precio: clase.precio,
            horario,
            creadaEn: new Date().toISOString()
        };
        let resultado = { ok: true };
        setReservas((previa) => {
            if (previa.some((r) => r.id === nueva.id)) {
                resultado = { ok: false, mensaje: 'Data duplicada' }
                return previa;
            };
            return [nueva, ...previa];
        });
        return resultado;
    }, []);//cierra el callback

    //*metodo cancelar reserva entra en el taller*

    const valor = useMemo(
        () => ({ reservas, cargando, agregarReserva }), [reservas, cargando, agregarReserva]
    );
}//Esta es la llave que cierra para la funcion
