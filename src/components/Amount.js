import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Money({ title, amount }) {
  const setColorOfAmount = () => {
    if (amount > 0) return "green";
    else if (amount < 0) return "red";
    else return "grey";
  };

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.amount, color: setColorOfAmount() }}>
        {amount}
      </Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  amount: {
    fontSize: 28,
    fontWeight: "bold",
  },
});
