













/**
 * 
 * 
        * let resultado = {ok: true};
        * setReservas((previa)=>{
        *      if(previa.some((r)=> r.id === nueva.id)){
        *          resultados = {ok: false, mensaje: 'Data duplicada'}
        *          return previa;
        *     });
        *     return [nueva, ...previa];
    *      });
 *      return resultados;
 *  },[]);//cierra el callback
 * 
 *  const valor = useMemo(
 *      ()=>{reservas, cargando, agregarReserva}, [reservas, cargando, agregarReserva]
 * );
 * 
 * return <ReservasContext.Provider value={valor}> {children} </ReservasContext.Provider>
 */