import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
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

  const loadLocalStorage = async () => {
    try {
      const localStorageBudget = await AsyncStorage.getItem("budget");
      console.log(localStorageBudget);
      const localStorageExpense = await AsyncStorage.getItem("expense");
      const localStorageBalance = await AsyncStorage.getItem("balance");
      const localStorageExpenseList = await AsyncStorage.getItem("expenseList");

      if (localStorageBudget === null) {
        try {
          await AsyncStorage.setItem("budget", "0");
          await AsyncStorage.setItem("expense", "0");
          await AsyncStorage.setItem("balance", "0");
          await AsyncStorage.setItem("expenseList", []);
        } catch (e) {
          Alert.alert("Error", "Please close & open the app!!!", [
            { text: "OK" },
          ]);
        }
      } else {
        setBudget(parseInt(localStorageBudget));
        setExpense(parseInt(localStorageExpense));
        setBalance(parseInt(localStorageBalance));
        // setAllExpenses(localStorageExpenseList);
        ToastAndroid.showWithGravityAndOffset(
          "Data Loaded",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      }
    } catch (error) {
      Alert.alert("Error", "Coudnt load your data!!!", [{ text: "OK" }]);
    }
  };

  const updateLocalStorage = async () => {
    try {
      await AsyncStorage.setItem("budget", budget.toString());
      console.log(budget);
      await AsyncStorage.setItem("expense", expense.toString());
      await AsyncStorage.setItem("balance", balance.toString());
      await AsyncStorage.setItem("expenseList", JSON.stringify(allExpenses));
      ToastAndroid.showWithGravityAndOffset(
        "Saved",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    } catch (e) {
      Alert.alert("Error", "Coudnt save the changes!!!", [{ text: "OK" }]);
    }
  };

  useEffect(() => {
    loadLocalStorage();
  }, []);

  useEffect(() => {
    updateLocalStorage();
  }, [budget, balance, expense]);

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
    // updateLocalStorage();
  };

  const addNewExpense = (item) => {
    // console.log(item);
    let { amount } = item;
    setBalance((prev) => parseInt(prev) - parseInt(amount));
    setExpense((prev) => parseInt(prev) + parseInt(amount));
    setAllExpenses((prev) => [item, ...prev]);
    // updateLocalStorage();
  };

  const deleteExpense = (item) => {
    // console.log(item);
    let { amount } = item;
    setBalance((prev) => parseInt(prev) + parseInt(amount));
    setExpense((prev) => parseInt(prev) - parseInt(amount));
    setAllExpenses((prev) => prev.filter((i) => i.id !== item.id));
    // updateLocalStorage();
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
