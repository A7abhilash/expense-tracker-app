import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import AddBudgetInput from "./components/AddBudgetInput";
import DisplayAmountDetails from "./components/DisplayAmountDetails";

export default function Home() {
  const [visibleAddBudget, setVisibleAddBudget] = useState(false);
  const [visibleAddExpense, setVisibleAddExpense] = useState(false);
  const [budget, setBudget] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.button}></View>
      <Button title="Add Budget" onPress={() => setVisibleAddBudget(true)} />
      <AddBudgetInput
        visibleAddBudget={visibleAddBudget}
        setVisibleAddBudget={setVisibleAddBudget}
        setBudget={setBudget}
      />
      <DisplayAmountDetails
        budget={budget}
        expense={expense}
        balance={balance}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  button: {
    margin: 5,
  },
});
