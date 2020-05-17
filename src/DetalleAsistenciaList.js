import React, {Component} from 'react';
import {FlatList, ToastAndroid} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import DetalleAsistenciaBox from './DetalleAsistenciaBox';
import {actualizarDetalleURL} from './URLs';

export default class DetalleAsistenciaList extends Component {
  state = {
    alumnos: [],
  };

  actualizarDetalle = (marcacion, idAsistencia, idInscripcion, idGrupo) => {
    fetch(actualizarDetalleURL, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        accion: 'actualizarDetalle',
        marcacion: marcacion,
        idAsistencia: idAsistencia,
        idInscripcion: idInscripcion,
        idGrupo: idGrupo,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        ToastAndroid.show(responseJson.resultado, ToastAndroid.SHORT);
      })
      .catch(error => {
        console.warn(error);
      });
  };

  setMarcar = (item, index) => {
    var alumnos = this.props.alumnoView.state.alumnos;
    var alumnosNew = alumnos.slice();
    if (alumnos[index].marcacion == 1) {
      alumnosNew[index].marcacion = 0;
      this.props.alumnoView.setState({alumnos: alumnosNew});
      this.actualizarDetalle(
        0,
        item.idasistencia, ///en postgres la escritura camello lo convierte todo en minusculas
        item.idinscripcion,
        item.idgrupo,
      );
    } else {
      alumnosNew[index].marcacion = 1;
      this.props.alumnoView.setState({alumnos: alumnosNew});
      this.actualizarDetalle(
        1,
        item.idasistencia,
        item.idinscripcion,
        item.idgrupo,
      );
    }
  };

  render() {
    const alumnos = this.props.alumnos;
    return (
      <FlatList
        data={alumnos}
        renderItem={({item, index}) => (
          <Menu>
            <MenuTrigger>
              <DetalleAsistenciaBox alumno={item} />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption
                style={{padding: 10}}
                onSelect={() => {
                  this.setMarcar(item, index);
                }}
                text={item.marcacion == 1 ? 'Desmarcar' : 'Marcar'}
              />
            </MenuOptions>
          </Menu>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}
