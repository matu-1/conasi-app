import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import DetalleAsistenciaList from './DetalleAsistenciaList';
import Icon from 'react-native-vector-icons/Ionicons';
import {mostrarDetalleURL} from './URLs';
const {width} = Dimensions.get('window');

export default class DetalleAsistenciaView extends Component {
  ///Para usar los parámetros en el título, necesitamos hacer navigationOptions una función que devuelva un objeto de configuración.
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('asistencia').fecha,
      headerStyle: {
        backgroundColor: '#3E64FF',
      },
      headerTintColor: '#ffffff', // su color del botón Atrás y el título
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };

  state = {
    alumnos: [],
    cargardatos: true,
  };

  componentDidMount() {
    const idAsistencia = this.props.navigation.getParam('asistencia').id;
    const idGrupo = this.props.navigation.getParam('grupo').id;
    this.mostrarDetalle(idAsistencia, idGrupo).then(alumnos => {
      this.setState({alumnos: alumnos, cargardatos: false});
      console.warn(alumnos);
    });
  }

  mostrarDetalle = (idAsistencia, idGrupo) => {
    const URL = mostrarDetalleURL + idAsistencia + '&idGrupo=' + idGrupo;
    return fetch(URL)
      .then(response => response.json()) //obtengo el data en JSON del URL
      .then(data => data.datos); //navego al data que requiero
  };

  irMarcacion = () => {
    this.props.navigation.navigate('Marcacion', {
      asistencia: this.props.navigation.getParam('asistencia'),
      grupo: this.props.navigation.getParam('grupo'),
      alumnos: this.state.alumnos,
    });
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
        <DetalleAsistenciaList alumnos={alumnos} alumnoView={this} />
        <TouchableOpacity
          onPress={() => this.irMarcacion()}
          activeOpacity={0.7}
          style={styles.actionButton}>
          <Icon style={{color: 'white'}} name="md-camera" size={25} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  mensaje: {
    fontSize: 16,
    padding: 10,
    fontWeight: 'bold',
  },

  actionButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 2,
    width: 56,
    height: 56,
    backgroundColor: '#3E64FF',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
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
});
