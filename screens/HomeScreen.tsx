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
  FlatList,
} from "react-native";
import { observer } from "mobx-react-lite";
import { store } from "../store/pokemonStore";
import { useQuery } from "react-query";
import { useNavigation } from "@react-navigation/native";

//pitanje za navigation
export function HomeScreen() {
  const url = "https://pokeapi.co/api/v2/pokemon";
  interface Pokemon {
    name: string;
    url: string;
  }

  //yes bad practice but ill learn
  const navigation = useNavigation<any>();

  const pokemoniSaQuery = useQuery("pokemoni", () =>
    fetch(url).then((res) => res.json())
  );

  if (pokemoniSaQuery.isError) {
    return (
      <View
        style={{ padding: 32, alignItems: "center", justifyContent: "center" }}
      >
        <Text>Something went wrong :(</Text>
      </View>
    );
  }
  if (pokemoniSaQuery.isLoading) {
    return (
      <View
        style={{ padding: 32, alignItems: "center", justifyContent: "center" }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  if (pokemoniSaQuery.isIdle) {
    return null;
  }
  store.getPokemonData(pokemoniSaQuery.data.results);
  // console.log(store.pokemons);

  const PokemonCharaceter = observer(function PokemonCharacter({
    pokemon,
    idx,
  }: {
    pokemon: Pokemon;
    idx: number;
  }) {
    const { name, url } = pokemon;
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        key={idx}
        style={{
          backgroundColor: "orange",
          width: "90%",
          marginHorizontal: "5%",
          marginVertical: 10,
          padding: 20,
        }}
        onPress={() => {
          store.setSelectedPokemon(url);
          navigation.navigate("PokemonDetailsScreen");
        }}
      >
        <View>
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "white" }}>
            {name.toUpperCase()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  });

  return (
    <FlatList
      keyExtractor={(pokemon) => pokemon.url}
      data={pokemoniSaQuery.data.results}
      windowSize={3}
      renderItem={({ item: pokemon, index: idx }) => {
        return (
          <PokemonCharaceter pokemon={pokemon} idx={idx}></PokemonCharaceter>
        );
      }}
    ></FlatList>
  );

  // const ProductListItem = observer(function ProductListItem({
  //   pokemon,
  //   idx,
  // }:{pokemon:Pokemon, idx:number}) {
  //   const { name, url } = pokemon;
  //   return (
  //     <TouchableOpacity
  //       activeOpacity={0.5}
  //       key={idx}>
  //       <View style={{ alignItems: "center" }}>
  //         <Text>{name}</Text>
  //         <Text>{url}</Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // });

  //  <FlatList
  // keyExtractor={(pokemon) => pokemon.url}
  // data={pokemoniSaQuery.data.results}
  // windowSize={5}
  // renderItem={({ item: pokemon, index: idx }) => {
  //   return (
  //     <ProductListItem
  //       pokemon={pokemon}
  //       idx={idx}
  //     ></ProductListItem>
  //   );
  // }}></FlatList>
}
