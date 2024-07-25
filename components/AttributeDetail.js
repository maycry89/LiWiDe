import React, { useEffect } from "react";
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";

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
    onCancel();
  };

  return (
    <Modal onRequestClose={onCancel} animationType="slide" visible={visible}>
      <View style={styles.container}>
        <View style={styles.attributes}>
          {!selectedAttribute || editable ? (
            <View>
              <TextInput
                //placeholder="Attribute"
                onChangeText={setTextAttribute}
                value={textAttribute}
              ></TextInput>
              <TextInput
                onChangeText={setTextSituation}
                //placeholder="Situation"
                value={textSituation}
              ></TextInput>
            </View>
          ) : (
            <View>
              <Text>{selectedAttribute.title}</Text>
              <Text>{selectedAttribute.situation}</Text>
            </View>
          )}
        </View>
        <View style={styles.actions}>
          {!selectedAttribute || editable ? (
            <Pressable // SAVE
              style={styles.buttons}
              onPress={handleSave}
            >
              <Text style={styles.btnText}>Save</Text>
            </Pressable>
          ) : (
            <View>
              <Pressable //EDIT
                style={styles.buttons}
                onPress={onEdit}
              >
                <Text style={styles.btnText}>Edit</Text>
              </Pressable>
              <Pressable //DELETE
                style={styles.buttons}
                onPress={handleDelete}
              >
                <Text style={styles.btnText}>Delete</Text>
              </Pressable>
            </View>
          )}

          <Pressable //CLOSE
            style={styles.buttons}
            onPress={() => {
              handleClose();
            }}
          >
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
