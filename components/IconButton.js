import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function IconButton({ onPress, icon, style, size }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        style,
        {
          transform: [{ scale: pressed ? 0.9 : 1 }],
        },
      ]}
    >
      <MaterialIcons name={icon} size={size} color="white" />
    </Pressable>
  );
}
