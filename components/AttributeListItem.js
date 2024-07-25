import React from "react";
import { Text, View, Pressable } from "react-native";

const AttributeListItem = ({ attribute }) => {
  return (
    <View>
      <Text> {attribute.title} </Text>
      <Text> {attribute.situation} </Text>

      <Pressable onPress={() => handleEdit(selectedItem.id)}>
        <Text>Edit</Text>
      </Pressable>
      <Pressable onPress={() => handleDelete(selectedItem.id)}>
        <Text>Delete</Text>
      </Pressable>
      <Pressable onPress={() => setSelectedItem(null)}>
        <Text>Back</Text>
      </Pressable>
    </View>
  );
};

export default AttributeListItem;
