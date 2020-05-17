import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import AsistenciaBox from './AsistenciaBox';

export default class AsistenciaList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  irDetalleAsistencia = item => {
    this.props.navigation.navigate('DetalleAsistencia', {
      asistencia: item,
      grupo: this.props.grupo,
    });
  };

  render() {
    const asistencias = this.props.asistencias;
    return (
      <FlatList
        data={asistencias}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={() => this.irDetalleAsistencia(item)}>
            <AsistenciaBox asistencia={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}
