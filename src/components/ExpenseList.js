import React from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Expense from "./Expense";

export default function ExpenseList({ allExpenses, deleteExpense }) {
  const handlePress = (item) => {
    Alert.alert(
      "Confirm",
      `Do you really wanna delete the expense:\nTitle: ${item.title} \nAmount: ${item.amount}`,
      [
        {
          text: "Cancel",
        },
        {
          text: "Yes",
          onPress: () => deleteExpense(item),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Expenses</Text>
      {allExpenses.length ? (
        <FlatList
          data={allExpenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onLongPress={() => handlePress(item)}>
              <Expense title={item.title} amount={item.amount} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.text}>No expenses added...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    paddingVertical: 10,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: "red",
  },
});
