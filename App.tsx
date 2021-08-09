import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import React from "react";
import { Text, View } from "react-native";
import { store } from "./Store";
import { observer } from "mobx-react-lite";
import _ from "lodash";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

const Example = observer(() => {
  const { isLoading, isError, isIdle, data } = useQuery(
    "repoData",
    async () => {
      const sacekaj = await store.fetchChars();
      return sacekaj;
    }
  );
  const charList = _.flatMap(data, (response: any) => response);

  if (isError) {
    return (
      <View
        style={{ padding: 32, alignItems: "center", justifyContent: "center" }}
      >
        <Text>Something went wrong :(</Text>
      </View>
    );
  }
  if (isLoading) {
    return (
      <View
        style={{ padding: 32, alignItems: "center", justifyContent: "center" }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isIdle) {
    return null;
  }

  return (
    <View>
      <Text>yes</Text>
      <View>
        {charList.map((e: any, i: number) => {
          return <Text key={i}>{e.name}</Text>;
        })}
      </View>
    </View>
  );
});
