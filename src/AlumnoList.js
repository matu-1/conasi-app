import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import AlumnoBox from './AlumnoBox';

export default class AlumnoList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const alumnos = this.props.alumnos;
    return (
      <FlatList
        data={alumnos}
        renderItem={({item}) => <AlumnoBox alumno={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}
