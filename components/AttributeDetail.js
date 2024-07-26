import React, { useEffect } from "react";
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import IconButton from "./IconButton";

export default function AttributeDetail({
  selectedAttribute,
  visible,
  onCancel,
  onSave,
  onDelete,
}) {
  const [textAttribute, setTextAttribute] = React.useState("Eigenschaft");
  const [textSituation, setTextSituation] = React.useState("Ereignis");
  const [editable, setEditable] = React.useState(false);

  useEffect(() => {
    if (selectedAttribute) {
      setTextAttribute(selectedAttribute.title);
      setTextSituation(selectedAttribute.situation);
    } else {
      setTextAttribute("Eigenschaft");
      setTextSituation("Ereignis");
    }
  }, [selectedAttribute]);

  const onEdit = () => {
    console.log("Editieren! ");
    setEditable(true);
  };

  const handleSave = () => {
    onSave(textAttribute, textSituation, selectedAttribute);
    setEditable(false);
  };

  const handleClose = () => {
    onCancel();
    setEditable(false);
  };

  const handleDelete = () => {
    onDelete(selectedAttribute.id);
    //onCancel();
  };

  return (
    <Modal onRequestClose={onCancel} animationType="slide" visible={visible}>
      <View style={styles.container}>
        <View style={styles.attributes}>
          {!selectedAttribute || editable ? (
            <View>
              <TextInput
                style={styles.textInputTitle}
                onChangeText={setTextAttribute}
                value={textAttribute}
              ></TextInput>
              <TextInput
                style={styles.textInput}
                onChangeText={setTextSituation}
                value={textSituation}
                multiline={true}
              ></TextInput>
            </View>
          ) : (
            <View>
              <Text style={styles.title}>{selectedAttribute.title}</Text>
              <Text style={styles.description}>
                {selectedAttribute.situation}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.actions}>
          <View style={styles.buttonRow}>
            {!selectedAttribute || editable ? (
              <IconButton // --- EDIT
                onPress={handleSave}
                icon={"save"}
                size={40}
                style={styles.buttons}
              ></IconButton>
            ) : (
              <View style={styles.buttonRow}>
                <IconButton // --- EDIT
                  onPress={onEdit}
                  icon={"edit"}
                  size={40}
                  style={styles.buttons}
                ></IconButton>
                <IconButton // --- DELETE
                  onPress={handleDelete}
                  icon={"delete"}
                  size={40}
                  style={styles.buttons}
                ></IconButton>
              </View>
            )}
            <IconButton // --- DELETE
              onPress={handleClose}
              icon={"close"}
              size={40}
              style={styles.buttons}
            ></IconButton>
          </View>
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
    backgroundColor: "#E0E6E9",
  },
  buttons: {
    margin: 10,
    padding: 20,
    //width: 100,
    backgroundColor: "#606060",
    borderRadius: 40,
  },
  attributes: {
    marginTop: "30%",
  },
  title: {
    alignSelf: "center",
    fontSize: 32,
    marginBottom: 15,
  },
  description: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 25,
    marginHorizontal: 20,
    lineHeight: 37,
  },

  textInputTitle: {
    padding: 10,
    alignSelf: "center",
    fontSize: 32,
    marginBottom: 15,
    backgroundColor: "white",
    borderRadius: 10,
    color: "gray",
  },
  textInput: {
    padding: 10,
    backgroundColor: "white",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 25,
    marginHorizontal: 20,
    lineHeight: 37,
    borderRadius: 10,
    color: "gray",
  },
  actions: {
    marginBottom: "20%",
  },
  btnText: {
    fontSize: 16,
    textAlign: "center",
  },

  buttonRow: {
    flexDirection: "row",
    //marginBottom: "20%",
  },
});
