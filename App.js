/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';

import data from './data'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      catFacts: [],
      url: [],
      showModal: false,
      selected: {},
      currentHouse: '',
    }
  }

  componentDidMount() {
    fetch('https://cat-fact.herokuapp.com/facts')
    .then(res => res.json())
    .then(resp => this.setState({catFacts: resp.all}))

  }

  getUrl() {
    setTimeout(() => {
        fetch('https://source.unsplash.com/random/')
      .then(res => {
        return res.url
      })
    }, 2000);
  }

  getHarry() {
    fetch('https://www.potterapi.com/v1/sortingHat')
    .then(res => res.json())
    .then(resp => this.setState({currentHouse: resp}))
  }
  
  renderItem = ({item}) => {
        return (
          <TouchableOpacity onPress={() => {
            this.setState({showModal: true, selected: item})
            this.getHarry()
          }} key={item.id} style={{height: 100, width: 300, backgroundColor: 'red', margin: 20, flexDirection: 'row', borderRadius: 5}}>
          <View style={{flex: 1, justifyContent: 'center', left: 5}}>
            <Text style={{fontSize: 22}}>{item.name}</Text>
            <Text>{item.role}</Text>
            <Text>{item.birthday}</Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center',}}>
            <Image
              style={{width: 100, height: 100, borderRadius: 3}}
              source={{uri: item.url}}
              />
          </View>
        </TouchableOpacity>
      )
  }
  
  render() {
    let num = (Math.floor(Math.random() * 140) + 1)
    let thing = this.state.catFacts[num]
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 100, backgroundColor: 'black'}}>
        <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', top: 100, backgroundColor: 'black'}}>
          <View style={{paddingBottom: 10}}>
            <Text style={{color: 'red', fontSize: 22}} onPress={() => alert()}>Red Mountain PQ</Text>
          </View>
          <FlatList
            data={data}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            style={{width: '100%'}}
            contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showModal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <TouchableOpacity onPress={() => this.setState({showModal: false})} style={{backgroundColor: 'transparent', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 100, height: 500, width: 300, backgroundColor: 'black'}}>
              <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
                <Image
                style={{width: 200, height: 200, borderRadius: 3}}
                source={{uri: this.state.selected.url}}
                />
                <Text style={{color: 'red', fontSize: 24}}>{this.state.selected.name}</Text>
                <Text style={{color: 'red', fontSize: 18}}>{this.state.selected.role}</Text>
                <Text style={{color: 'red', fontSize: 18}}>{this.state.selected.birthday}</Text>
                <Text style={{color: 'red', fontSize: 18}}>Cat Facts: { thing && thing.text}</Text>
                <Text style={{color: 'red', fontSize: 18}}>Hogwarts House: {this.state.currentHouse && this.state.currentHouse}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
};

const styles = StyleSheet.create({

});

export default App;
