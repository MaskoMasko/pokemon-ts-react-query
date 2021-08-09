import { flow, getEnv, getRoot, Instance, types } from "mobx-state-tree";
import { useContext } from "react";
import { MobXProviderContext } from "mobx-react";

const url = "https://swapi.dev/api/people/?format=json";
const { string, array, identifier, model, map } = types;
const CharModel = model({
  name: identifier,
  height: string,
  mass: string,
  hair_color: string,
  skin_color: string,
  eye_color: string,
  birth_year: string,
  gender: string,
  homeworld: string,
  films: array(string),
  species: array(string),
  vehicles: array(string),
  starships: array(string),
});

const CharStore = model("CharStore", {
  map: map(CharModel),
})
  .actions((self) => ({
    process(data: any): any {
      const dataList = Array.from(data);
      const mapped = dataList.map((e: any) => {
        return self.map.put(e);
      });
      return Array.isArray(data) ? mapped : mapped[0];
    },
  }))
  .actions((self) => {
    return {
      fetchChars: flow(function* fetchChars() {
        const charList = yield fetch(url);
        const things = yield charList.json();
        return self.process(things.results);
      }),
    };
  });

export const store = CharStore.create({});

// const { model, identifier, safeReference, string, map } = types;

// const Author = model("Author", {
//   id: identifier,
//   name: string,
// });
// export type AuthorInstance = Instance<typeof Author>;

// const Book = model("Book", {
//   id: identifier,
//   title: string,
//   author: safeReference(Author),
//   isFavorite: false,
// }).actions((self) => ({
//   makeFavorite() {
//     self.isFavorite = true;
//   },
// }));
// export type BookInstance = Instance<typeof Book>;

// const BookStore = model("BookStore", {
//   map: map(Book),
// })
//   .actions((self) => ({
//     process(data: any): any {
//       const dataList = Array.from(data);
//       const root: StoreInstance = getRoot(self);
//       const mapped = dataList.map((e: any) => {
//         e.author = root.authorStore.process(e.author).id;
//         return self.map.put(e);
//       });
//       return Array.isArray(data) ? mapped : mapped[0];
//     },
//   }))
//   .actions((self) => ({
//     readBookList: flow<BookInstance[], []>(function* readBookList(): any {
//       const bookListRaw = yield getEnv(self).api.readBookList();
//       return self.process(bookListRaw);
//     }),
//   }));

// const AuthorStore = model("AuthorStore", {
//   map: map(Author),
// })
//   .actions((self) => ({
//     process(data: any): any {
//       const dataList = Array.from(data);
//       const mapped = dataList.map((e: any) => {
//         return self.map.put(e);
//       });
//       return Array.isArray(data) ? mapped : mapped[0];
//     },
//   }))
//   .actions((self) => {
//     return {
//       readAuthorList: flow<AuthorInstance[], []>(
//         function* readAuthorList(): any {
//           const authorList = yield getEnv(self).api.readAuthorList();
//           return self.process(authorList);
//         }
//       ),
//     };
//   });

// export const Store = model("Store", {
//   bookStore: BookStore,
//   authorStore: AuthorStore,
// });

// export type StoreInstance = Instance<typeof Store>;

// export function useStore(): StoreInstance {
//   return useContext(MobXProviderContext).store;
// }
