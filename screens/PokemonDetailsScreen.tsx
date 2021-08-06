import * as React from "react";
import { Text, View } from "react-native";
import { store } from "../store/pokemonStore";
import { observer } from "mobx-react-lite";
import { useQuery } from "react-query";

//pitanje za navigation
export function PokemonDetailsScreen() {
  const PokemonDetails = useQuery("PokemonDetails", () =>
    fetch(`${store.selectedPokemon?.url}`).then((res) => res.json())
  );
  if (PokemonDetails.isLoading) {
    return <Text>Loading...</Text>;
  }
  if (PokemonDetails.isError) {
    return <Text>THere was na error...</Text>;
  }
  if (PokemonDetails.isIdle) {
    return null;
  }

  const mappedAbilities = PokemonDetails.data.abilities.map((e: any) => {
    return e.ability.name;
  });
  return (
    <View>
      <Text>{store.selectedPokemon?.name}</Text>
      <View>
        {mappedAbilities.map((e: string, i: number) => {
          return <Text key={i}>{e}</Text>;
        })}
      </View>
    </View>
  );
}
