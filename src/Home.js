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
  const [loading, setLoading] = useState(true);
  const [visibleAddBudget, setVisibleAddBudget] = useState(false);
  const [visibleAddExpense, setVisibleAddExpense] = useState(false);
  const [budget, setBudget] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [allExpenses, setAllExpenses] = useState([]);

  const showToastMessage = (msg) => {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  const showAlertMessage = (title, msg) => {
    Alert.alert(title, msg, [{ text: "OK" }]);
  };

  const loadLocalStorage = async () => {
    try {
      const localStorageBudget = await AsyncStorage.getItem("budget");
      // console.log(localStorageBudget);
      const localStorageExpense = await AsyncStorage.getItem("expense");
      const localStorageBalance = await AsyncStorage.getItem("balance");
      const localStorageExpenseList = await AsyncStorage.getItem("expenseList");

      if (localStorageBudget === null) {
        try {
          await AsyncStorage.setItem("budget", "0");
          await AsyncStorage.setItem("expense", "0");
          await AsyncStorage.setItem("balance", "0");
        } catch (e) {
          showAlertMessage("Error", "Please close & open the app!!!");
        }
      } else if (localStorageExpenseList === null) {
        await AsyncStorage.setItem("expenseList", []);
      } else {
        setBudget(parseInt(localStorageBudget));
        setExpense(parseInt(localStorageExpense));
        setBalance(parseInt(localStorageBalance));
        setAllExpenses(JSON.parse(localStorageExpenseList));
        showToastMessage("Data Loaded");
      }
    } catch (error) {
      showAlertMessage("Error", "Coudnt load your data!!!");
    }
  };

  const updateLocalStorage = async () => {
    try {
      await AsyncStorage.setItem("budget", budget.toString());
      // console.log(budget);
      await AsyncStorage.setItem("expense", expense.toString());
      await AsyncStorage.setItem("balance", balance.toString());
      await AsyncStorage.setItem("expenseList", JSON.stringify(allExpenses));
      showToastMessage("Saved");
    } catch (e) {
      Alert.alert("Error", "Coudnt save the changes!!!", [{ text: "OK" }]);
    }
  };

  useEffect(() => {
    setLoading(true);
    loadLocalStorage().then(() => setLoading(false));
  }, [setLoading]);

  useEffect(() => {
    updateLocalStorage();
  }, [budget, balance, expense, allExpenses]);

  const addBudget = (val) => {
    const result = budget + val;
    // console.log(typeof val);
    if (result < 0) {
      showAlertMessage("Invalid", "Invalid input, Budget can't be negative");
      return;
    }
    if (typeof val !== Number) {
      showAlertMessage("Invalid", "Invalid input, Budget should be a number");
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

  return !loading ? (
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
        // disabled={budget == 0}
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
  ) : (
    <Text style={styles.loadingText}>Loading...</Text>
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
  loadingText: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 50,
  },
});
