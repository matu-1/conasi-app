import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import AsistenciaList from './AsistenciaList';
import Icon from 'react-native-vector-icons/Ionicons';
import {registrarAsistenciaURL, mostrarAsistenciaURL} from './URLs';
const {width} = Dimensions.get('window');

export default class AsistenciaView extends Component {
  static navigationOptions = {
    title: 'Asistencia',
    headerStyle: {
      backgroundColor: '#3E64FF',
    },
    headerTintColor: '#ffffff', // su color del botón Atrás y el título
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  state = {
    asistencias: [],
    cargardatos: true,
  };

  componentDidMount() {
    const idGrupo = this.props.navigation.getParam('grupo').id;
    this.mostrarAsistencia(idGrupo).then(asistencias => {
      this.setState({asistencias: asistencias, cargardatos: false});
      console.warn(asistencias);
    });
  }

  getFechaActual = () => {
    var fecha = new Date(); //Fecha actual
    var dia = fecha.getDate(); //obteniendo dia
    var mes = fecha.getMonth() + 1; //obteniendo mes
    var anio = fecha.getFullYear(); //obteniendo año
    if (dia < 10) {
      dia = '0' + dia;
    } //agrega cero si el menor de 10
    if (mes < 10) {
      mes = '0' + mes;
    } //agrega cero si el menor de 10
    return anio + '-' + mes + '-' + dia;
  };

  registrarAsistencia = () => {
    const idGrupo = this.props.navigation.getParam('grupo').id;
    console.warn('idgrupo', idGrupo, this.getFechaActual());
    const fecha = this.getFechaActual();
    fetch(registrarAsistenciaURL, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        accion: 'registrar',
        fecha: fecha,
        idGrupo: idGrupo,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        ToastAndroid.show(responseJson.resultado, ToastAndroid.SHORT);
        console.warn(responseJson);
        if (responseJson.resultado == 'Se registro correctamente') {
          // this.cambiarVista(responseJson.data);
          const asistencias = this.state.asistencias.slice();
          asistencias.unshift({
            id: responseJson.idAsistencia,
            fecha: fecha,
          });
          this.setState({asistencias: asistencias});
        }
      })
      .catch(error => {
        console.warn(error);
      });
  };

  mostrarAsistencia = idGrupo => {
    const URL = mostrarAsistenciaURL + idGrupo;
    return fetch(URL)
      .then(response => response.json()) //obtengo el data en JSON del URL
      .then(data => data.datos); //navego al data que requiero
  };

  mostrarAlerta = () => {
    Alert.alert(
      'Mensaje',
      'Esta seguro de registrar la asistencia de hoy?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.warn('Cancelado'),
          style: 'cancel',
        },
        {text: 'Aceptar', onPress: () => this.registrarAsistencia()},
      ],
      {cancelable: false},
    );
  };

  render() {
    const asistencias = this.state.asistencias;
    return (
      <View style={styles.container}>
        {this.state.cargardatos ? (
          <View style={styles.indicador}>
            <ActivityIndicator color="#3E64FF" size="large" />
          </View>
        ) : null}
        {asistencias.length == 0 && this.state.cargardatos == false ? (
          <Text style={styles.mensaje}>
            No se tiene registros de asistencias :(
          </Text>
        ) : null}

        <AsistenciaList
          asistencias={asistencias}
          grupo={this.props.navigation.getParam('grupo')}
          navigation={this.props.navigation}
        />
        <TouchableOpacity
          onPress={() => this.mostrarAlerta()}
          activeOpacity={0.7}
          style={styles.actionButton}>
          <Icon style={{color: 'white'}} name="md-add" size={25} />
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
    fontSize: 17,
    padding: 15,
    fontWeight: 'bold',
    color: '#3E64FF',
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
