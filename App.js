/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  FlatList,
  Image
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const [apiResponse, setApiResponse] = useState([]);

  onTextChange = async (text) => {
    if (text.length > 3) {
      const url = `https://www.googleapis.com/customsearch/v1?key=AIzaSyANnTdaal1euTtCrzkd777Ayb3hAH1vYP4&cx=018264299595958242005:dvs2adlrsca&q=${text}`
      const respose = await fetch(url)
      const responseJson = await respose.json()
      console.log("response is", responseJson)
      console.log("response items is", responseJson.items)
      if (responseJson.items != undefined)
        setApiResponse(responseJson.items)
      else
        setApiResponse([])
    }
  }

  _renderItems = ({ item, index }) => {
    console.log("items are", item)
    return (
      <View style={{ flex: 1, flexDirection: 'row', marginBottom: 15 }}>
        <Image
          source={{ uri: item.pagemap.cse_thumbnail[0].src }}
          style={{ height: 70, width: 70, resizeMode: 'contain' }}
        />
        <View style={{ paddingLeft: 10, flex: 1 }}>
          <Text numberOfLines={1}>{item.link}</Text>
          <Text style={styles.sectionTitle}>{item.title}</Text>
          <Text style={styles.sectionDescription}>{item.pagemap.metatags[0]["og:description"]}</Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#DCDCDC', flex: 1 }}>
      <TextInput
        onChangeText={(text) => onTextChange(text)}
        style={{ backgroundColor: 'white' }}
      />
      { apiResponse.length > 0 &&
        <FlatList
          data={apiResponse}
          renderItem={_renderItems}
          style={styles.sectionContainer}
        />
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 20,
    paddingHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '500',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '300',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
