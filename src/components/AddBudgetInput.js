import React, { useState } from "react";
import {
  Button,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function AddBudgetInput({
  visibleAddBudget,
  setVisibleAddBudget,
  addBudget,
  budget,
}) {
  const [text, setText] = useState("");

  const closeModal = () => {
    setText("");
    setVisibleAddBudget(false);
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    closeModal();
    addBudget(parseInt(text));
  };

  return (
    <Modal visible={visibleAddBudget} animationType="slide">
      <Text style={styles.title}>Add Budget</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={(val) => setText(val)}
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
