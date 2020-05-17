import React, {Component} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  ToastAndroid,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {AsyncStorage} from 'react-native';
import {loginURL} from './URLs';

const {width} = Dimensions.get('window');

export default class LoginView extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    textUsuario: 'adry@gmail.com',
    textPassword: '123',
    ocultarPass: true, ///oculta la contraseña
    cargardatos: false,
  };

  entradaUsuario = textUsuario => {
    this.setState({textUsuario});
  };

  entradaPassword = textPassword => {
    this.setState({textPassword});
  };

  validarEntradas = () => {
    if (this.state.textUsuario != '' && this.state.textPassword != '') {
      return true;
    } else {
      return false;
    }
  };

  login = () => {
    fetch(loginURL, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        accion: 'login',
        email: this.state.textUsuario,
        password: this.state.textPassword,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        ToastAndroid.show(responseJson.mensaje, ToastAndroid.SHORT);
        if (responseJson.mensaje == 'Se logeo correctamente') {
          AsyncStorage.setItem(
            'user',
            JSON.stringify(responseJson.data),
            err => {},
          );
          this.setState({cargardatos: false});
          this.props.navigation.navigate('Inicio', {user: responseJson.data});
          // this.cambiarVista(responseJson.data);
        }
      })
      .catch(error => {
        this.setState({cargardatos: false});
        ToastAndroid.show('Error de conexion :(', ToastAndroid.SHORT);
        console.warn(error);
      });
  };

  irInicio = () => {
    if (this.validarEntradas()) {
      this.setState({cargardatos: true});
      this.login();
    } else {
      ToastAndroid.show('Faltan datos', ToastAndroid.SHORT);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.cargardatos ? (
          <View style={styles.indicador}>
            <ActivityIndicator color="#3E64FF" size="large" />
          </View>
        ) : null}
        <View style={styles.logo}>
          <Image
            style={styles.logoImagen}
            source={require('../images/icon.png')}
          />
          {/* <Text style={styles.titulo}>Conasi</Text> */}
        </View>

        <KeyboardAvoidingView
          style={styles.formulario}
          behavior="padding"
          enabled>
          <View style={styles.inputContainer}>
            <Icon
              style={styles.inputIcon}
              name="md-person"
              size={25}
              color="white"
            />
            <TextInput
              style={[styles.input]}
              value={this.state.textUsuario}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              placeholder="Escribe tu usuario"
              onChangeText={this.entradaUsuario}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon
              style={styles.inputIcon}
              name="md-lock"
              size={25}
              color="white"
            />
            <TextInput
              style={[styles.input, {paddingRight: 40}]}
              value={this.state.textPassword}
              secureTextEntry={this.state.ocultarPass}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              placeholder="Escribe tu contraseña"
              onChangeText={this.entradaPassword}
            />
            <TouchableOpacity
              style={styles.inputIconRight}
              onPress={() =>
                this.setState({ocultarPass: !this.state.ocultarPass})
              }>
              <Icon
                name={this.state.ocultarPass ? 'md-eye' : 'md-eye-off'}
                size={27}
                color="white"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={this.irInicio}
            style={styles.botonLogin}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
              INGRESAR
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>

        {/* <View style={styles.registrar}>
          <TouchableOpacity
          // onPress={()=>this.props.navigation.navigate('UsuarioRegistro',{cerrar:cerrar})}
          >
            <Text style={styles.registrarTexto}>
              Olvidaste tu contraseña?,dale click
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  inputContainer: {
    marginBottom: 20,
  },

  input: {
    width: width * 0.8,
    borderRadius: 23,
    height: 45,
    paddingLeft: 40,
    paddingRight: 15,
    backgroundColor: 'rgba(62, 100, 255, 0.6)',
    fontSize: 16,
    color: 'white',
  },

  inputIcon: {
    position: 'absolute',
    top: 10,
    left: 12,
    zIndex: 2,
  },

  inputIconRight: {
    position: 'absolute',
    top: 3,
    right: 5,
    padding: 6, ///para que se puede clickear mejor
    zIndex: 2,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'black',
  },

  logo: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  formulario: {
    // backgroundColor:'blue',
    flex: 0.3,
    alignItems: 'center',
  },

  botonLogin: {
    marginTop: 10,
    width: width * 0.6,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3E64FF',
    elevation: 3,
    borderRadius: 23,
    color: 'white',
  },

  registrar: {
    // backgroundColor:'red',
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  registrarTexto: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },

  logoImagen: {
    width: 140,
    height: 140,
  },

  indicador: {
    position: 'absolute',
    top: 190,
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
