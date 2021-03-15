import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Expense Tracker</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "darkslateblue",
    padding: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "700",
    color: "white",
  },
});
