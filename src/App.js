import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';
import PropTypes from 'prop-types';

function App() {

  //Citas en LOCALSTOGAGE
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {
    citasIniciales = []; //Si nohay citas, array vacío;
  }

  //Arreglo de citas
  const [citas, guardarCitas] = useState (citasIniciales);

  //UseEffect para realizar ciertas operaciones cuando el state cambia;
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas)); //si hay citas, las metemos en localStorage;
    } else {
      localStorage.setItem('citas', JSON.stringify([])) //si no hay citas, agregamos string vacío; 
    }
  }, [citas]) //arreglo vacío para que solo se ejecute una vez? se le conoce como DEPENDENCIAS

  //Funcion que tome las citas actuales y agregue la nueva
  const crearCita = cita => {
    guardarCitas([...citas, cita]);
  }

  //Función que elimina una cita por su ID
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id) //te trae el que es diferente, o sea que guarda los NO eliminados
    guardarCitas(nuevasCitas);
  }

  // Mensaje condicional hay o no citas
  const titulo = citas.length ===0 ? 'No hay citas ': 'Administra tus citas';
  console.log(citas.length);

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className='container'>
        <div className='row'>
          <div className='one-half column'>
              <Formulario 
                crearCita={crearCita}
              />
          </div>
          <div className='one-half column'>
              <h2>{titulo}</h2>
              {citas.map(cita => (
                <Cita 
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
                />
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

//Documentar el Componente ('Prop')
Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}

export default App;
