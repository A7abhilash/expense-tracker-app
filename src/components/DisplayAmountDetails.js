import React from "react";
import { StyleSheet, View } from "react-native";
import Amount from "./Amount";

export default function DisplayAmountDetails({ budget, expense, balance }) {
  return (
    <View style={styles.container}>
      <Amount title="Budget" amount={budget} />
      <Amount title="Expense" amount={expense} />
      <Amount title="Balance" amount={balance} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    flexDirection: "row",
  },
});
