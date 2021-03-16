import React, { useState } from "react";
import {
  Alert,
  Button,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function AddNewExpense({
  visibleAddExpense,
  setVisibleAddExpense,
  addNewExpense,
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const closeModal = () => {
    setTitle("");
    setAmount("");
    setVisibleAddExpense(false);
  };

  const handleSubmit = () => {
    if (title !== "" && amount !== "" && amount > 0) {
      Keyboard.dismiss();
      closeModal();
      let item = {
        title,
        amount: parseInt(amount),
        id: new Date().getTime().toString(),
      };
      addNewExpense(item);
    } else {
      Alert.alert("Invalid", "Invalid input", [{ text: "OK" }]);
    }
  };

  return (
    <Modal visible={visibleAddExpense} animationType="slide">
      <Text style={styles.title}>Add New Expense</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(val) => setTitle(val)}
        placeholder="Enter Title"
      />
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={(val) => setAmount(val)}
        keyboardType="numeric"
        placeholder="Enter Amount(₹)"
      />
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="cancel" color="darkgray" onPress={closeModal} />
        </View>
        <View style={styles.button}>
          <Button title="add" color="green" onPress={handleSubmit} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: "center",
    paddingVertical: 10,
    marginBottom: 5,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
  input: {
    margin: 10,
    padding: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    fontSize: 18,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    margin: 10,
  },
});
