import React, { useState } from "react";
import { Alert, Button, StyleSheet, View } from "react-native";
import AddBudgetInput from "./components/AddBudgetInput";
import AddNewExpense from "./components/AddNewExpense";
import DisplayAmountDetails from "./components/DisplayAmountDetails";
import ExpenseList from "./components/ExpenseList";

export default function Home() {
  const [visibleAddBudget, setVisibleAddBudget] = useState(false);
  const [visibleAddExpense, setVisibleAddExpense] = useState(false);
  const [budget, setBudget] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [allExpenses, setAllExpenses] = useState([]);

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

  const addNewExpense = (item) => {
    // console.log(item);
    let { amount } = item;
    setBalance((prev) => parseInt(prev) - parseInt(amount));
    setExpense((prev) => parseInt(prev) + parseInt(amount));
    setAllExpenses((prev) => [item, ...prev]);
  };

  const deleteExpense = (item) => {
    // console.log(item);
    let { amount } = item;
    setBalance((prev) => parseInt(prev) + parseInt(amount));
    setExpense((prev) => parseInt(prev) - parseInt(amount));
    setAllExpenses((prev) => prev.filter((i) => i.id !== item.id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.button}></View>
      <Button title="Add Budget" onPress={() => setVisibleAddBudget(true)} />
      {!visibleAddExpense && (
        <AddBudgetInput
          visibleAddBudget={visibleAddBudget}
          setVisibleAddBudget={setVisibleAddBudget}
          addBudget={addBudget}
          budget={budget}
        />
      )}
      <DisplayAmountDetails
        budget={budget}
        expense={expense}
        balance={balance}
      />
      <Button
        title="Add New Expense"
        onPress={() => setVisibleAddExpense(true)}
      />
      {!visibleAddBudget && (
        <AddNewExpense
          setVisibleAddExpense={setVisibleAddExpense}
          visibleAddExpense={visibleAddExpense}
          addNewExpense={addNewExpense}
        />
      )}
      <ExpenseList allExpenses={allExpenses} deleteExpense={deleteExpense} />
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
