import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import InicioBox from './InicioBox';

export default class InicioList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  irOpcion = item => {
    this.props.navigation.navigate('Opcion', {grupo: item});
    // console.warn(this.props.navigation);
  };

  render() {
    const grupos = this.props.grupos;
    return (
      <FlatList
        data={grupos}
        renderItem={({item, index}) => (
          <TouchableOpacity
            activeOpacity={0.2}
            onPress={() => this.irOpcion(item)}>
            <InicioBox grupo={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}
