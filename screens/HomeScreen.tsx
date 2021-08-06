import * as React from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { store } from "../store/pokemonStore";

//pitanje za navigation
export function HomeScreen({ navigation }: any) {
  const url = "https://pokeapi.co/api/v2/pokemon"
  React.useEffect(()=>{
    store.fetchPokemons(url)
  },[])
  return <View>
    <Text>SOme randokme</Text>
  <View>{store.pokemons.map((pokemon, index)=>{
    const {name, url} = pokemon
    return <Text key={index}>{name}</Text>
  })}</View>
  </View>
}