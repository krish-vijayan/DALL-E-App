import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  SafeAreaView,
  Animated,
} from "react-native";
import { useEffect, useState } from "react";
import { fetchImage } from "../DALL-E/src/Services/fetchImage";
import "react-native-url-polyfill/auto";
import SearchBar from "react-native-dynamic-search-bar";

export default function App() {
  const [data, setData] = useState<string>("");
  const [query, onChangeQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [spinner, setSpinner] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = () => {
    console.log(query);
    setIsLoading(true);
    setSpinner(true);
    fetchImage(query).then((res) => {
      console.log(res);
      if (res.response) {
        switch (res.response.status) {
          case 400:
            setError("Banned Word(s) Entered :/");
            break;
          case 429:
            setError("Too many requests :(");
            break;
          default:
            setError("OpenAI API Down :/");
        }
      } else {
        setError("");
        setData(res);
        setIsLoading(false);
      }
      setSpinner(false);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        style={styles.search}
        spinnerVisibility={spinner}
        placeholder="Search here"
        onChangeText={onChangeQuery}
        onSearchPress={() => handleSubmit()}
      />
      <Text style={styles.error}>{error}</Text>
      {isLoading ? (
        <Image
          style={styles.tinyLogo}
          source={{
            uri: "https://centralized.ai/content/images/2022/12/DALL-E.png",
          }}
        />
      ) : (
        <Image style={styles.tinyLogo} source={{ uri: `${data}` }} />
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
    alignItems: "center",
  },
  tinyLogo: {
    position: "absolute",
    top: 150,
    width: 270,
    height: 270,
  },

  error: {
    position: "absolute",
    top: 100,
  },
  search: {
    marginBottom: 200,
  },
});
