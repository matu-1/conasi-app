import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import InicioList from './InicioList';
import {mostrarGruposURL} from './URLs';
const {width} = Dimensions.get('window');

export default class InicioView extends Component {
  static navigationOptions = {
    title: 'Inicio',
    headerStyle: {
      backgroundColor: '#3E64FF',
    },
    headerTintColor: '#ffffff', // su color del botón Atrás y el título
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  state = {
    grupos: [],
    cargardatos: true,
  };

  componentDidMount() {
    const idDocente = this.props.navigation.getParam('user').id;
    this.mostrarGrupos(idDocente).then(grupos => {
      this.setState({grupos: grupos, cargardatos: false});
      console.warn(grupos);
    });
  }

  mostrarGrupos = idDocente => {
    const URL = mostrarGruposURL + idDocente;
    return fetch(URL)
      .then(response => response.json()) //obtengo el data en JSON del URL
      .then(data => data.datos); //navego al data que requiero
  };

  render() {
    const grupos = this.state.grupos;
    return (
      <View style={styles.container}>
        {this.state.cargardatos ? (
          <View style={styles.indicador}>
            <ActivityIndicator color="#3E64FF" size="large" />
          </View>
        ) : null}
        <InicioList grupos={grupos} navigation={this.props.navigation} />
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
});
