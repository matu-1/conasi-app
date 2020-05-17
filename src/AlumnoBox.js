import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default class AlumnoBox extends Component {
  render() {
    const {id, ci, nombre} = this.props.alumno;
    return (
      <View style={styles.alumnoCaja}>
        <View style={styles.horizontalCaja}>
          <Image style={styles.imagen} source={require('../images/user.png')} />
          <View style={styles.textoCaja}>
            {/* <Text>{id}</Text> */}
            <Text style={styles.textNombre}>{nombre}</Text>
            <Text style={styles.textCi}>{ci}</Text>
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

  textNombre: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  textCi: {
    color: 'gray',
    fontSize: 16,
  },
});
