import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Foundation from '@expo/vector-icons/Foundation';
import { useEffect, useState } from "react";
import { api } from "../services/api";

interface MoviesProps {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

export default function Index() {
  const [movies, setMovies] = useState<MoviesProps[]>([])

  const loadedMovies = async () => {
    const response = await api.get("/movie/popular")

    setMovies(response.data.results)
  }

  useEffect(() => {
    loadedMovies()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>O que voce quer assistir hoje?</Text>

      <View style={styles.headerInput}>
        <TextInput style={styles.input} placeholder="Buscar" placeholderTextColor='#fff' />
        <Foundation name="magnifying-glass" size={24} color="#fff" />
      </View>

      <FlatList
        horizontal
        data={movies}
        renderItem={({ item }) => (
          <Pressable>
            <Image
              style={styles.posterPath}
              source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
            />
          </Pressable>
        )}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242A32",
    paddingHorizontal: 30,
    paddingTop: 35,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  headerInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#3A3F47',
    padding: 10,
    borderRadius: 16,
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    flex: 1,
  },
  posterPath: {
    width: 144,
    height: 210,
    borderRadius: 16,
    marginVertical: 5,
    marginHorizontal: 5,
  },
})