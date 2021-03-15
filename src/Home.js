import React, { useState } from "react";
import { Alert, Button, StyleSheet, View } from "react-native";
import AddBudgetInput from "./components/AddBudgetInput";
import DisplayAmountDetails from "./components/DisplayAmountDetails";

export default function Home() {
  const [visibleAddBudget, setVisibleAddBudget] = useState(false);
  const [visibleAddExpense, setVisibleAddExpense] = useState(false);
  const [budget, setBudget] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  const addBudget = (val) => {
    const result = budget + val;
    // console.log(result);
    if (result < 0) {
      Alert.alert("Invalid", "Invalid input, Budget can't be negative", [
        { text: "OK" },
      ]);
      return;
    }
    setBudget(result);
    setBalance((prev) => parseInt(prev) + parseInt(val));
  };

  return (
    <View style={styles.container}>
      <View style={styles.button}></View>
      <Button title="Add Budget" onPress={() => setVisibleAddBudget(true)} />
      <AddBudgetInput
        visibleAddBudget={visibleAddBudget}
        setVisibleAddBudget={setVisibleAddBudget}
        addBudget={addBudget}
        budget={budget}
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
