import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Button,
  Image,
  ToastAndroid,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import MarcacionModal from './MarcacionModal';
import {apiclarifaiURL} from './URLs';

const {width} = Dimensions.get('window');

export default class MarcacionView extends Component {
  static navigationOptions = {
    title: 'Marcacion',
    headerStyle: {
      backgroundColor: '#3E64FF',
    },
    headerTintColor: '#ffffff', // su color del botón Atrás y el título
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  state = {
    imagen: null,
    cargarDatos: false,
  };

  uploadImage = () => {
    this.setState({cargarDatos: true});
    RNFetchBlob.fetch(
      'POST',
      apiclarifaiURL,
      {
        Authorization: 'Bearer access-token',
        otherHeader: 'foo',
        'Content-Type': 'multipart/form-data',
      },
      [
        // custom content type
        {
          name: 'image',
          filename: 'image.png',
          type: 'image/png',
          data: this.state.imagen.data,
        },
      ],
    )
      .then(resp => {
        if (resp.json().status == 'OK') {
          this.marcacionModal.setModalVisible(true);
          this.marcacionModal.setResultados(resp.json().resultados);
          // console.warn(resp.json());
        }
        this.setState({cargarDatos: false});
        ToastAndroid.show(resp.json().mensaje, ToastAndroid.SHORT);
      })
      .catch(err => {
        console.warn(err);
        ToastAndroid.show('Error en la conectividad', ToastAndroid.SHORT);
        this.setState({cargarDatos: false});
      });
  };

  elegirImagen = () => {
    const options = {
      title: 'Seleccione',
      takePhotoButtonTitle: 'Tomar foto',
      chooseFromLibraryButtonTitle: 'Elegir de la galeria',
      cancelButtonTitle: 'cancelar',
      // noData: true,
    };

    ImagePicker.showImagePicker(options, response => {
      // console.warn('respuesta  ', response);   //lo comento xq el data de la imagen hace q tarde en cargar
      if (response.didCancel) {
        console.warn('Seleccion cancelada');
      } else if (response.error) {
        console.warn('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.warn('User tapped custom button: ', response.customButton);
      } else {
        // console.warn('uri', response.uri);
        this.setState({imagen: response});
        // this.uploadImage(response.uri, 'imgen');
      }
    });
  };

  render() {
    const {imagen} = this.state;
    const alumnos = this.props.navigation.getParam('alumnos');
    const grupo = this.props.navigation.getParam('grupo');
    const asistencia = this.props.navigation.getParam('asistencia');
    return (
      <View style={styles.container}>
        {this.state.cargarDatos == true ? (
          <View style={styles.indicador}>
            <ActivityIndicator size="large" color="#3E64FF" />
          </View>
        ) : null}
        <View style={styles.cajaImagen}>
          <Image
            source={
              imagen
                ? {uri: imagen.uri}
                : require('../images/icon_camara02.jpg')
            }
            style={styles.imagen}
          />
        </View>

        <MarcacionModal
          alumnos={alumnos}
          grupo={grupo}
          asistencia={asistencia}
          navigation={this.props.navigation}
          ref={ref => (this.marcacionModal = ref)}
        />

        <View style={styles.cajaBotones}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.boton}
            onPress={this.elegirImagen}>
            <Text style={styles.textBoton}>Seleccionar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.boton, {marginLeft: 10}]}
            onPress={
              this.state.imagen
                ? this.uploadImage
                : () =>
                    ToastAndroid.show(
                      'Seleccione una imagen!!!',
                      ToastAndroid.SHORT,
                    )
            }>
            <Text style={styles.textBoton}>Procesar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  cajaImagen: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },

  imagen: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },

  cajaBotones: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: 'blue',
  },

  boton: {
    height: 40,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3E64FF',
    borderRadius: 20,
    elevation: 3,
  },

  textBoton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },

  indicador: {
    position: 'absolute',
    right: width * 0.5 - 25,
    top: 150,
    zIndex: 1,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 100,
  },
});

// comentario=> al definir un nuevo props el props con el que viene se resetea por eso se guarda su valor original en otro props para que no se pierda, todo esto para hacer la navegacion ya que lo hace atraves de esto
