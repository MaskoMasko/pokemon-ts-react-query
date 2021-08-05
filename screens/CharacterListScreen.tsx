import { observer } from "mobx-react-lite";
import * as React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { characterStore } from "../store/starWarsStore";

export const CharacterListScreen = observer(({ navigation }: any) => {
  //swapi vise nije maintained tako da sad moren koristiti pokeapi.co
  const url = "https://swapi.dev/api/people/?format=json";

  React.useEffect(() => {
    characterStore.fetchData(url);
  }, []);

  interface CharInterface {
    name: string;
    url: string;
    id: number;
  }
  return (
    //da za ovakove objekte delan interface?

    <ScrollView style={styles.charItemContainer}>
      {characterStore.characterList.map((char: CharInterface, idx: number) => {
        const { name, url, id } = char;
        return (
          <TouchableOpacity
            onPress={() => {
              characterStore.setSelecterCharacter(id);
              navigation.navigate("CharDetail");
            }}
            key={id}
            style={styles.charListItem}
            activeOpacity={0.5}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.charListItemText}>{name}</Text>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={
                  // store.addChar(name);
                  () => {
                    characterStore.addSelectedCharacterToFavorites(name);
                    navigation.navigate("FavList");
                  }
                }
                style={{
                  padding: 10,
                  backgroundColor: "black",
                  borderRadius: 5,
                  margin: 5,
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  FAVORITE
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  charItemContainer: {
    width: "100%",
    backgroundColor: "rgb(46, 49, 49)",
  },
  charListItem: {
    marginHorizontal: "3%",
    width: "94%",
    height: 50,
    backgroundColor: "yellow",
    margin: 15,
    borderRadius: 10,
    justifyContent: "center",
  },
  charListItemText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});
