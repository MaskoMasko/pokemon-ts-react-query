import { observer } from "mobx-react";
import { useRoute } from "@react-navigation/native";
import * as React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { characterStore } from "../store/starWarsStore";

//pitanje ako je objekt possibly undefined (samo upitnik na kraj ili ca?)
export const CharacterDetailScreen = observer(({ navigation }: any) => {
  interface SelectedCharacterInterface {
    id: number;
    name: string;
    birth_year: string;
    eye_color: string;
    hair_color: string;
    mass: string;
    height: string;
    skin_color: string;
    gender: string;
  }
  const {
    id,
    name,
    birth_year,
    eye_color,
    hair_color,
    mass,
    height,
    skin_color,
    gender,
  }: SelectedCharacterInterface = characterStore.selectedCharacter;

  React.useEffect(() => {
    characterStore.fetchMovies(id);
  }, []);
  return (
    <ScrollView
      style={{
        flex: 1,
        paddingLeft: 10,
        backgroundColor: "rgb(46, 49, 49)",
      }}
    >
      <Text style={styles.characterName}>{name}</Text>
      <Text style={styles.characterPodnaslovi}>Personal</Text>
      <Text style={styles.characterDrugo}>Gender: {gender}</Text>
      <Text style={styles.characterDrugo}>Brith Year: {birth_year}</Text>
      <Text style={styles.characterDrugo}>Height: {height} cm</Text>
      <Text style={styles.characterDrugo}>Mass: {mass} kg</Text>
      <Text style={styles.characterDrugo}>Eye Color: {eye_color}</Text>
      <Text style={styles.characterDrugo}>Hair Color: {hair_color}</Text>
      <Text style={styles.characterDrugo}>Skin Color: {skin_color}</Text>
      <Text style={styles.characterPodnaslovi}>Movies</Text>
      <View>
        {characterStore.filmiciList.map((filmic, i) => {
          return (
            <Text key={i} style={styles.characterDrugo}>
              {filmic.title}
            </Text>
          );
        })}
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.goBack();
          }}
          style={[
            styles.addToFavBtn,
            {
              marginHorizontal: 10,
              marginVertical: 20,
            },
          ]}
        >
          <Text style={styles.addToFavBtnText}>GO BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={(): void => {
            navigation.navigate("FavList");
            characterStore.addSelectedCharacterToFavorites(
              characterStore.selectedCharacter.name
            );
          }}
          style={[
            styles.addToFavBtn,
            {
              backgroundColor: "yellow",
              marginHorizontal: 10,
              marginVertical: 20,
            },
          ]}
        >
          <Text
            style={[
              styles.addToFavBtnText,
              {
                color: "black",
                fontWeight: "bold",
              },
            ]}
          >
            ADD TO FAVORITES
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  characterName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  characterPodnaslovi: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  characterDrugo: {
    fontSize: 20,
    color: "white",
  },
  addToFavBtn: {
    backgroundColor: "black",
    padding: 20,
    borderRadius: 10,
  },
  addToFavBtnText: {
    color: "white",
    alignSelf: "center",
    fontWeight: "bold",
  },
});
