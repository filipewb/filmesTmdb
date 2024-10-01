import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
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
  const [typeMovies, setTypesMovies] = useState<MoviesProps[]>([])
  const [posterMovies, setPosterMovies] = useState("popular")

  const loadedMovies = async () => {
    const response = await api.get("/movie/popular")
    setMovies(response.data.results)
  }

  const loadedMoviesType = async () => {
    const response = await api.get(`/movie/${posterMovies}`)
    setTypesMovies(response.data.results)
  }

  useEffect(() => {
    loadedMovies()
  }, [])

  useEffect(() => {
    loadedMoviesType()
  }, [posterMovies])

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>O que voce quer assistir hoje?</Text>

        <View style={styles.headerInput}>
          <TextInput style={styles.input} placeholder="Buscar" placeholderTextColor='#fff' />
          <Foundation name="magnifying-glass" size={24} color="#fff" />
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
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

        <ScrollView style={styles.options} horizontal showsHorizontalScrollIndicator={false}>
          <Pressable onPress={() => setPosterMovies("now_playing")}>
            <Text style={[styles.optionText, posterMovies === "now_playing" ? styles.optionTextSelected : null]}>Exibindo agora</Text>
          </Pressable>

          <Pressable onPress={() => setPosterMovies("popular")}>
            <Text style={[styles.optionText, posterMovies === "popular" ? styles.optionTextSelected : null]}>Popular</Text>
          </Pressable>

          <Pressable onPress={() => setPosterMovies("top_rated")}>
            <Text style={[styles.optionText, posterMovies === "top_rated" ? styles.optionTextSelected : null]}>Mais Avaliados</Text>
          </Pressable>

          <Pressable onPress={() => setPosterMovies("in_coming")}>
            <Text style={[styles.optionText, posterMovies === "in_coming" ? styles.optionTextSelected : null]}>A caminho</Text>
          </Pressable>
        </ScrollView>

        <View style={styles.optionsMovies}>
          {typeMovies.map(movie => (
            <Pressable key={movie.id}>
              <Image
                style={styles.optionsMoviesPosterPath}
                source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
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
  options: {
    marginTop: 20,
    marginBottom: 20,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'semibold',
    marginHorizontal: 10,
    paddingBottom: 10,
  },
  optionTextSelected: {
    borderBottomWidth: 5,
    borderBottomColor: '#3A3F47',
  },
  optionsMovies: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'center'
  },
  optionsMoviesPosterPath: {
    width: 100,
    height: 145,
    borderRadius: 16,
    margin: 2,
  },
})