import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default class AsistenciaBox extends Component {
  render() {
    const {id, fecha} = this.props.asistencia;
    return (
      <View style={styles.alumnoCaja}>
        <View style={styles.horizontalCaja}>
          <Image
            style={styles.imagen}
            source={require('../images/icon02.jpg')}
          />
          <View style={styles.textoCaja}>
            <Text style={styles.textFecha}>{fecha}</Text>
            {/* <Text style={styles.textId}>{id}</Text> */}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  alumnoCaja: {
    flex: 1,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },

  horizontalCaja: {
    flexDirection: 'row',
  },

  imagen: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },

  textoCaja: {
    flexDirection: 'column',
    justifyContent: 'center',
  },

  textFecha: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  textId: {
    color: 'gray',
    fontSize: 16,
  },
});
