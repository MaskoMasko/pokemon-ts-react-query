import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "./screens/HomeScreen";
import { CharacterListScreen } from "./screens/CharacterListScreen";
import { FavCharacterListScreen } from "./screens/FavCharacterListScreen";
import { CharacterDetailScreen } from "./screens/CharacterDetailScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          options={{
            title: "Star Wars Character Collection",
            headerStyle: { backgroundColor: "black", height: 120 },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{
            title: "Character List",
            headerStyle: { backgroundColor: "black", height: 120 },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
          name="CharList"
          component={CharacterListScreen}
        />
        <Stack.Screen
          options={{
            title: "Favorite Characters",
            headerStyle: { backgroundColor: "black", height: 120 },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
          name="FavList"
          component={FavCharacterListScreen}
        />
        <Stack.Screen
          options={{
            title: "Character Details",
            headerStyle: { backgroundColor: "black", height: 120 },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
          name="CharDetail"
          component={CharacterDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

//ma ca ja znan, ne pitaj nis pls thanks

// import * as React from "react";
// import { View, Text, LogBox, Image, Button } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { useQuery, QueryClient, QueryClientProvider } from "react-query";

// //pitaj za ovaj timer error, ovode ga samo ignora
// LogBox.ignoreLogs(["Setting a timer"]);

// function HomeScreen() {
//   async function fetchRandomUser(): Promise<any> {
//     const res = await fetch("https://randomuser.me/api/");
//     const end = await res.json();
//     return end;
//   }
//   const [allData, setAllData] = React.useState([]);
//   const brek: any = useQuery("RandomUser", () => {
//     fetchRandomUser();
//     setAllData((data: any[]) => [
//       ...data,
//       {
//         name: brek.data.results[0].name.first,
//         image: brek.data.results[0].picture.thumbnail,
//       },
//     ]);
//   });
//   //ZASTO MI TORNIVA SAFNKISFSDF LOSDFsfl sdf ldsf
//   //dela i kad reloadan dobijen error LOL
//   //AHAHAHAHAHHA KOJI JOKE
//   return (
//     <View>
//       <Text>YES DELA</Text>
//       {/* <Text>{brek.data.results[0].name.first}</Text>
//       <Image
//         source={{ uri: brek.data.results[0].picture.thumbnail }}
//         style={{ width: 100, height: 100 }}
//       ></Image> */}
//       <Button title="add one more random user" onPress={() => brek}></Button>
//     </View>
//   );
// }

// const Stack = createNativeStackNavigator();
// function App() {
//   const queryClient = new QueryClient();
//   return (
//     <QueryClientProvider client={queryClient}>
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="Home" component={HomeScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </QueryClientProvider>
//   );
// }

// export default App;
