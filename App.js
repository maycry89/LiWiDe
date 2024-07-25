import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AttributeDetail from "./components/AttributeDetail";

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
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        setSelectedItem(item);
        setModalVisible(true);
      }}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Pressable
        style={styles.deleteButton}
        onPress={() => deleteAttribute(item.id)}
      >
        <Text style={styles.deleteButtonText}>Löschen</Text>
      </Pressable>
    </TouchableOpacity>
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
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    saveData(newData);
    console.log("Gelöscht: " + id);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Pressable style={styles.button} onPress={addAttribute}>
        <Text style={styles.btnText}>Neu</Text>
      </Pressable>

      <AttributeDetail
        visible={modalVisible}
        selectedAttribute={selectedItem}
        onCancel={() => {
          setSelectedItem(null);
          setModalVisible(false);
          console.log("Schließen");
        }}
        onSave={addAttributeToList}
        onDelete={deleteAttribute}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#f9c2ff",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
  },
  button: {
    padding: 20,
    backgroundColor: "dimgray",
    borderRadius: 40,
    marginTop: 20,
  },
  btnText: {
    color: "white",
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
  },
});
