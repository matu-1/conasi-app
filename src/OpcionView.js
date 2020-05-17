import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const {width} = Dimensions.get('window');

export default class OpcionView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    title: 'Opciones',
    headerStyle: {
      backgroundColor: '#3E64FF',
    },
    headerTintColor: '#ffffff', // su color del botón Atrás y el título
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  irVista(id) {
    const grupo = this.props.navigation.getParam('grupo');
    if (id == 1) {
      this.props.navigation.navigate('Alumno', {grupo: grupo});
    } else if (id == 2) {
      this.props.navigation.navigate('Asistencia', {grupo: grupo});
    } else {
      this.props.navigation.navigate('Marcacion', {grupo: grupo});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cajaHorizontalOpcion}>
          <View style={styles.cajaOpcion}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.opcion}
              onPress={() => this.irVista(1)}>
              <Icon
                style={styles.inputIcon}
                name="users"
                size={60}
                color="#3E64FF"
              />
              <Text style={styles.titulo}>Alumnos</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cajaOpcion}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.opcion}
              onPress={() => this.irVista(2)}>
              <Icon
                style={styles.inputIcon}
                name="clipboard-check"
                size={60}
                color="#3E64FF"
              />
              <Text style={styles.titulo}>Asistencia</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={styles.cajaHorizontalOpcion}>
          <View style={styles.cajaOpcion}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.opcion}
              onPress={() => this.irVista(3)}>
              <Icon
                style={styles.inputIcon}
                name="clipboard-check"
                size={60}
                color="#3E64FF"
              />
              <Text style={styles.titulo}>Marcar</Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f2f2f2',
  },

  cajaHorizontalOpcion: {
    flexDirection: 'row',
    marginTop: 20,
  },

  cajaOpcion: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },

  opcion: {
    width: width * 0.35,
    padding: 15,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  inputIcon: {
    marginBottom: 5,
  },

  titulo: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});
