import React from "react";
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";

export default function AddNewAttribute({
  selectedAttribute,
  visible,
  onCancel,
  onSave,
}) {
  const [textAttribute, onChangeTextAttribute] = React.useState("Eigenschaft");
  const [textSituation, onChangeTextSituation] = React.useState("Ereignis");

  return (
    <Modal onRequestClose={onCancel} animationType="slide" visible={visible}>
      <View style={styles.container}>
        <View style={styles.attributes}>
          <View>
            <TextInput
              placeholder="Attribute"
              onChangeText={onChangeTextAttribute}
              //value={textAttribute}
            ></TextInput>
            <TextInput
              onChangeText={onChangeTextSituation}
              placeholder="Situation"
            ></TextInput>
          </View>
        </View>
        <View style={styles.actions}>
          <Pressable
            style={styles.buttons}
            onPress={() => onSave(textAttribute, textSituation)}
          >
            <Text style={styles.btnText}>Save</Text>
          </Pressable>

          <Pressable style={styles.buttons} onPress={onCancel}>
            <Text style={styles.btnText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttons: {
    margin: 10,
    padding: 20,
    width: 100,
    backgroundColor: "yellowgreen",
    borderRadius: 15,
  },
  attributes: {
    marginTop: "30%",
  },
  btnText: {
    fontSize: 16,
    textAlign: "center",
  },

  actions: {
    flexDirection: "row",
    marginBottom: "20%",
  },
});
