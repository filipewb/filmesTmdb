import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>O que voce quer assistir hoje?</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242A32",
    paddingHorizontal: 30,
    paddingTop: 35,
  }
})