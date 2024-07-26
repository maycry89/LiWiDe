import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AttributeDetail from "./components/AttributeDetail";
import IconButton from "./components/IconButton";

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@attributes");
      const savedData = jsonValue != null ? JSON.parse(jsonValue) : [];
      setData(savedData);
      if (savedData.length > 0) {
        const maxId = Math.max(...savedData.map((item) => parseInt(item.id)));
        setNextId(maxId + 1);
      }
    } catch (e) {
      console.error("Fehler beim Laden der Daten", e);
    }
  };

  const saveData = async (newData) => {
    try {
      const jsonValue = JSON.stringify(newData);
      await AsyncStorage.setItem("@attributes", jsonValue);
    } catch (e) {
      console.error("Fehler beim Speichern der Daten", e);
    }
  };

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.attribute}
      onPress={() => {
        setSelectedItem(item);
        setModalVisible(true);
      }}
    >
      <Text style={styles.itemText}>{item.title}</Text>
      {/* <Pressable
        style={styles.deleteButton}
        onPress={() => deleteAttribute(item.id)}
      >
        <Text style={styles.deleteButtonText}>Löschen</Text>
      </Pressable> */}
    </Pressable>
  );

  const addAttribute = () => {
    console.log("Eigenschaft hinzufügen");
    setSelectedItem(null);
    setModalVisible(true);
  };

  const addAttributeToList = (title, situation, selectedAttribute) => {
    setModalVisible(false);
    setSelectedItem(null);
    let newData;
    if (selectedAttribute) {
      newData = data.map((item) =>
        item.id === selectedAttribute.id ? { ...item, title, situation } : item
      );
    } else {
      newData = [...data, { id: nextId.toString(), title, situation }];
      setNextId((prevId) => prevId + 1);
    }
    setData(newData);
    saveData(newData);
    console.log("Speichern von " + title + " " + situation);
    console.log(nextId);
  };

  const deleteAttribute = (id) => {
    setModalVisible(false);
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    saveData(newData);
    console.log("Gelöscht: " + id);
  };

  const showDeleteAlert = (id) => {
    Alert.alert(
      "Eintrag wirklich löschen?",
      " ",
      [
        {
          text: "Ok",
          onPress: () => deleteAttribute(id),
        },
        {
          text: "Anders überlegt",
          onPress: () => console.log("Button 2 gedrückt"),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <AttributeDetail
        visible={modalVisible}
        selectedAttribute={selectedItem}
        onCancel={() => {
          setSelectedItem(null);
          setModalVisible(false);
          console.log("Schließen");
        }}
        onSave={addAttributeToList}
        onDelete={showDeleteAlert}
      />
      <FlatList
        style={styles.list}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <IconButton
        onPress={addAttribute}
        icon={"add"}
        size={40}
        style={styles.button}
      ></IconButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0E6E9",
  },
  list: {
    marginTop: "20%",
    width: "100%",
  },
  attribute: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#F3FCFF",
    borderRadius: 30,
    alignSelf: "center",
    shadowColor: "black",
    elevation: 10,
  },
  itemText: {
    fontSize: 24,
    textAlign: "center",
  },
  button: {
    padding: 15,
    marginTop: "7%",
    backgroundColor: "#606060",
    borderRadius: 40,
    marginBottom: "7%",
    alignSelf: "center",
  },
  btnText: {
    color: "white",
    textAlign: "center",
  },
});
