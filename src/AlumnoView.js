import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import AlumnoList from './AlumnoList';
import {mostrarAlumnosURL} from './URLs';
const {width} = Dimensions.get('window');

export default class AlumnoView extends Component {
  static navigationOptions = {
    title: 'Alumnos',
    headerStyle: {
      backgroundColor: '#3E64FF',
    },
    headerTintColor: '#ffffff', // su color del botón Atrás y el título
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  state = {
    alumnos: [],
    cargardatos: true,
  };

  componentDidMount() {
    const idGrupo = this.props.navigation.getParam('grupo').id;
    this.mostrarAlumnos(idGrupo).then(alumnos => {
      this.setState({alumnos: alumnos, cargardatos: false});
      console.warn(alumnos);
    });
  }

  mostrarAlumnos = idGrupo => {
    const URL = mostrarAlumnosURL + idGrupo;
    return fetch(URL)
      .then(response => response.json()) //obtengo el data en JSON del URL
      .then(data => data.datos); //navego al data que requiero
  };

  render() {
    const alumnos = this.state.alumnos;
    return (
      <View style={styles.container}>
        {this.state.cargardatos ? (
          <View style={styles.indicador}>
            <ActivityIndicator color="#3E64FF" size="large" />
          </View>
        ) : null}
        {alumnos.length == 0 && this.state.cargardatos == false ? (
          <Text style={styles.mensaje}>
            No se tienen alumnos registrados :(
          </Text>
        ) : null}
        <AlumnoList alumnos={alumnos} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  indicador: {
    position: 'absolute',
    top: 25,
    left: width * 0.5 - 25,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 3,
  },

  mensaje: {
    fontSize: 17,
    padding: 15,
    fontWeight: 'bold',
    color: '#3E64FF',
  },
});
