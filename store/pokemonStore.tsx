import {
  types,
  flow,
  getSnapshot,
  onSnapshot,
  applySnapshot,
} from "mobx-state-tree";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PokemonModel = types.model("PokemonModel", {
  url: types.identifier,
  name: types.string,
});

const PokemonStore = types
  .model("PokemonStore", {
    pokemons: types.array(PokemonModel),
    selectedPokemon: types.safeReference(PokemonModel),
  })
  .actions((self) => {
    return {
      getPokemonData(data: any) {
        self.pokemons = data;
      },
      setSelectedPokemon(pokemonId: any): void {
        self.selectedPokemon = pokemonId;
        // applySnapshot(self, { selectedPokemon: pokemonId });
      },
    };
  });

export const store = PokemonStore.create({
  pokemons: [],
});

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
//       fetchData: flow(function* fetchData(url: string) {
//         const result = yield fetch(url);
//         const characterListData = yield result.json();
//         self.characterList = characterListData;
//       }),
//       fetchMovies: flow(function* (id: number) {
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
//       setSelecterCharacter(characterId: number): void {
//         applySnapshot(self, { selectedCharacter: characterId });
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
//     const getData = flow(function* () {
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
//       onAppStart: flow(function* () {
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

// const BookStore = model("BookStore", {
//nez bas map ali da
//   map: map(Book),
// })
//   .actions((self) => ({
//dobije datu
//     process(data) {
//pretvori u array ako vec ni
//       const dataList = _.castArray(data);
//dobije root model -- pogledaj na netu
//       const root = getRoot(self);
//mapira kroz datu
//       const mapped = dataList.map((e) => {
//dobije id od autora
//authorStore.process gre doli i samo dobije id od zelljenega autora
//         e.author = root.authorStore.process(e.author).id;
//stavlja u map opet
//         return self.map.put(e);
//       });
//provjerava ako je array
//       return Array.isArray(data) ? mapped : mapped[0];
//     },
//   }))
//   .actions((self) => ({
//fetcha datu
//     readBookList: flow(function* (params) {
//       const env = getEnv(self);
//to ni jako bitno more dojti i fetch samo on je nap env da more nisto uzeti idk (test i guess)
//       const bookListRaw = yield env.http.get(`/books`, {
//         params,
//       });
//processa dobijenu datu
//       return self.process(bookListRaw);
//     }),
//   }));

// const AuthorStore = model("AuthorStore", {
//   map: map(Author),
// }).actions((self) => ({
//dobije datu
//   process(data) {
//_.castArray stavlja u array ako ni vec (Lodash lib)
//     const dataList = _.castArray(data);
//stavlja u mapu autore
//     const mapped = dataList.map((e) => {
//put stavlja u map
//       return self.map.put(e);
//     });
//provjeri ako je data array ako je returna mapped ako ne prvi item u authorStore-u
//     return Array.isArray(data) ? mapped : mapped[0];
//   },
// }));
