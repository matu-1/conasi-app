/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import LoginView from './LoginView';
import InicioView from './InicioView';
import OpcionView from './OpcionView';
import AlumnoView from './AlumnoView';
import MarcacionView from './MarcacionView';
import AsistenciaView from './AsistenciaView';
import DetalleAsistenciaView from './DetalleAsistenciaView';

export default class App extends Component {
  render() {
    return (
      <MenuProvider>
        <AppContainer />
      </MenuProvider>
    );
  }
}
const appStackNavigator = createStackNavigator({
  Login: {
    screen: LoginView,
  },

  Inicio: {
    screen: InicioView,
  },

  Opcion: {
    screen: OpcionView,
  },

  Alumno: {
    screen: AlumnoView,
  },

  Marcacion: {
    screen: MarcacionView,
  },

  Asistencia: {
    screen: AsistenciaView,
  },

  DetalleAsistencia: {
    screen: DetalleAsistenciaView,
  },
});

const AppContainer = createAppContainer(appStackNavigator);
