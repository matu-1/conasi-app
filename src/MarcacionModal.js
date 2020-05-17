import React, {Component} from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  Alert,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {AsyncStorage} from 'react-native';
import {actualizarDetalleMultipleURL, apiclarifaiImageURL} from './URLs';
var {width, height} = Dimensions.get('window');

export default class MarcacionModal extends Component {
  state = {
    modalVisible: false,
    resultados: [],
    user: null,
  };

  componentDidMount() {
    AsyncStorage.getItem('user', (err, result) => {
      this.setState({user: JSON.parse(result)}); ///JSON.parse() lo convierte a OBJEto
    });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setResultados = resultados => {
    this.setState({resultados: resultados});
    // console.warn('resultados proceso', resultados);
  };

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
    return dia + '/' + mes + '/' + anio;
  };

  cambiarVista() {
    const resetAction = StackActions.reset({
      ///se usa para redefinir las rutas
      index: 4, //la ruta destino es decir la que se va a mostrar
      actions: [
        NavigationActions.navigate({
          routeName: 'Login',
          params: {},
        }),
        NavigationActions.navigate({
          routeName: 'Inicio',
          params: {user: this.state.user},
        }),
        NavigationActions.navigate({
          routeName: 'Opcion',
          params: {grupo: this.props.grupo},
        }),
        NavigationActions.navigate({
          routeName: 'Asistencia',
          params: {grupo: this.props.grupo},
        }),
        NavigationActions.navigate({
          routeName: 'DetalleAsistencia',
          params: {asistencia: this.props.asistencia, grupo: this.props.grupo},
        }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  actualizarDetalleMultiple = alumnosReconocidos => {
    // console.warn(alumnosReconocidos);
    fetch(actualizarDetalleMultipleURL, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        accion: 'actualizarDetalleMultiple',
        alumnos: alumnosReconocidos,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        ToastAndroid.show(responseJson.resultado, ToastAndroid.SHORT);
        // console.warn(responseJson);
        this.setModalVisible(false);
        if (responseJson.resultado == 'Se registro correctamente') {
          this.cambiarVista();
        }
      })
      .catch(error => {
        console.warn(error);
      });
  };

  generarResultado = () => {
    const resultados = this.state.resultados;
    const alumnos = this.props.alumnos;
    const alumnosReconocidos = [];
    for (let i = 0; i < resultados.length; i++) {
      const alumnoResultado = resultados[i];
      if (alumnoResultado.resultado != 'No esta registrado') {
        for (let index = 0; index < alumnos.length; index++) {
          const alumno = alumnos[index];
          if (alumnoResultado.resultado == alumno.nombre) {
            alumnosReconocidos.push({
              marcacion: 1,
              idAsistencia: alumno.idasistencia,/// postgres cambia todo a minuscula
              idInscripcion: alumno.idinscripcion,
              idGrupo: alumno.idgrupo,
            });
          }
        }
      }
    }
    this.actualizarDetalleMultiple(alumnosReconocidos);
  };

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal cerrado.');
          this.setModalVisible(false);
        }}>
        <View style={styles.cajaModal}>
          <View style={styles.modal}>
            <ScrollView style={styles.cajaResultados}>
              {this.state.resultados.map(resultado => (
                <View key={resultado.path} style={styles.resultado}>
                  <Image
                    source={{
                      uri: apiclarifaiImageURL + resultado.path,
                    }}
                    style={styles.imagen}
                  />
                  <Text>{resultado.resultado}</Text>
                </View>
              ))}
            </ScrollView>
            <View style={styles.fecha}>
              <Text style={styles.textoFecha}>{this.getFechaActual()}</Text>
            </View>
            <View style={styles.cajaBotones}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.boton}
                onPress={() => this.setModalVisible(false)}>
                <Text style={styles.textBoton}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.boton, {marginLeft: 10}]}
                onPress={() => this.generarResultado()}>
                <Text style={styles.textBoton}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  cajaModal: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modal: {
    backgroundColor: 'white',
    width: width - 70,
    height: 400,
    elevation: 3,
    borderRadius: 3,
  },

  cajaResultados: {
    flex: 0.8,
    marginTop: 4,
  },

  resultado: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
  },

  imagen: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginRight: 10,
  },

  cajaBotones: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue',
  },

  boton: {
    height: 40,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3E64FF',
    borderRadius: 20,
    elevation: 3,
  },

  textBoton: {
    color: 'white',
    fontWeight: 'bold',
  },

  fecha: {
    alignItems: 'center',
  },

  textoFecha: {
    fontWeight: 'bold',
    fontSize: 16,
    // color: 'gray',
  },
});
