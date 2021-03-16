import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Expense({ title, amount }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.amount}>{amount}₹</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    borderRadius: 10,
    borderColor: "lightgray",
    borderWidth: 1,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  amount: {
    marginLeft: "auto",
    fontSize: 16,
  },
});
