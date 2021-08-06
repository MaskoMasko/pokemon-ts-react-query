import {
  types,
  flow,
  getSnapshot,
  onSnapshot,
  applySnapshot,
} from "mobx-state-tree";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PokemonModel = types.model("PokemonModel", {
  name:types.string,
  url:types.string
})

const PokemonStore = types.model("PokemonStore",{
  pokemons:types.array(PokemonModel)
}).actions((self)=>{
  return{
    fetchPokemons: flow(function* fetchPokemons(url){
      const results = yield fetch(url)
      const pokemonData = yield results.json()
      self.pokemons = pokemonData.results; 
    })
  }
})

export const store = PokemonStore.create({
  pokemons:[]
})

// const FilmiciModel = types.model("Movie", {
//   title: types.string,
// });

// const CharacterModel = types.model("Character", {
//   id: types.identifierNumber,
//   url: types.string,
//   name: types.optional(types.string, ""),
//   birth_year: types.string,
//   eye_color: types.string,
//   movies: types.array(types.string),
//   hair_color: types.string,
//   skin_color: types.string,
//   mass: types.string,
//   height: types.string,
//   gender: types.string,
// });

// const Store = types
//   .model("Store", {
//     characterList: types.array(CharacterModel),
//     selectedCharacter: types.safeReference(CharacterModel),
//     favoriteCharacterList: types.array(types.string),
//     filmiciList: types.array(FilmiciModel),
//   })
//   .actions((self) => {
//     return {
//       fetchData: flow(function* fetchData(url:string) {
//         const result = yield fetch(url);
//         const characterListData = yield result.json();
//         self.characterList = characterListData;
//       }),
//       fetchMovies: flow(function*(id:number){
//         for (let i = 0; i < self.characterList[id].movies.length; i++) {
//           const filmici = yield fetch(
//             `${self.characterList[id].movies[i]}?format=json`
//           );
//           const filmiciToJson = yield filmici.json();
//           self.filmiciList.push({ title: filmiciToJson.title });
//         }
//       }),
//     };
//   })
//   .actions((self) => {
//     return {
//       //pitanje: kada uzimamo za safe refrence, dajemo broj dobijemo objekt, pa za ca ga rabi assignati??
//       setSelecterCharacter(characterId: any): void {
//         self.selectedCharacter = characterId;
//         self.filmiciList.clear();
//       },
//     };
//   })
//   .actions((self) => {
//     return {
//       addSelectedCharacterToFavorites(name: string): void {
//         if (self.favoriteCharacterList.includes(name)) {
//           return;
//         }
//         self.favoriteCharacterList.push(name);
//       },
//     };
//   })
//   .actions((self) => {
//     return {
//       removeCharacterFromList(id: number): void {
//         self.favoriteCharacterList.splice(id, 1);
//       },
//     };
//   })
//   .actions((self) => {
//     //pitanje za ca kad su generator func?
//     const getData = flow(function*() {
//       try {
//         const jsonValue = yield AsyncStorage.getItem("favorite character list");
//         return jsonValue != null ? JSON.parse(jsonValue) : null;
//       } catch (e) {
//         console.log("Error: ", e);
//       }
//     });
//     return { getData };
//   })
//   .actions((self) => {
//     return {
//       onAppStart: flow(function*() {
//         try {
//           const rez = yield self.getData();
//           applySnapshot(self, rez);
//         } catch (e) {
//           console.log("Error While Reading Data...");
//           AsyncStorage.clear();
//         }
//         onSnapshot(self, () => {
//           AsyncStorage.setItem("favorite character list", JSON.stringify(self));
//         });
//       }),
//     };
//   });

// export const characterStore = Store.create({
//   characterList: [],
//   favoriteCharacterList: [],
// });

// characterStore.onAppStart();
