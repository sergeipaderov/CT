import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NavButton = ({ name, active, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name={name} size={20} color={active ? "#FD5068" : "#BDBDBD"} />
    </TouchableOpacity>
  );
};

export default NavButton;
