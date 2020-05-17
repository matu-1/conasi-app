import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default class InicioBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {id, nombre, materia} = this.props.grupo;
    return (
      <View style={styles.grupoCaja}>
        <View style={styles.horizontalCaja}>
          <Image
            style={styles.imagen}
            source={require('../images/icon_book.jpg')}
          />
          <View style={styles.textoCaja}>
            {/* <Text>{id}</Text> */}
            <Text style={styles.textmateria}>{materia}</Text>
            <Text style={styles.textnombre}>{nombre}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  grupoCaja: {
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

  textmateria: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  textnombre: {
    color: 'gray',
    fontSize: 16,
  },
});
