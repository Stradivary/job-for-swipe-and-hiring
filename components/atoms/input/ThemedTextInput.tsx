import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  InputModeOptions,
  TouchableOpacity,
} from "react-native";
import { HeadingText } from "../text/HeadingText";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons"; // Ikon dari Ionicons

export type ThemedTextInputProps = {
  text: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  type: string;
  error?: string;
};

export function ThemedTextInput({
  text,
  onChangeText,
  placeholder,
  type,
  error,
}: ThemedTextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State untuk toggle password visibility

  const handleBlur = () => {
    setIsFocused(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle visibilitas password
  };

  return (
    <View>
      <View
        style={[
          styles.container,
          isFocused && styles.containerFocused,
          error ? styles.containerError : {},
        ]}
      >
        <TextInput
          style={[
            styles.textInput,
            isFocused && styles.textInputFocused,
            error ? styles.textInputError : {},
          ]}
          onChangeText={onChangeText}
          value={text}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          secureTextEntry={type === "password" && !showPassword} // Tampilkan atau sembunyikan password
          inputMode={type === "password" ? "text" : (type as InputModeOptions)}
          placeholderTextColor="#999"
        />

        {/* Jika type password, tambahkan tombol untuk toggle visibilitas */}
        {type === "password" && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.icon}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"} // Ikon berganti sesuai visibilitas
              size={24}
              color="#999"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <HeadingText type="label" color={Colors.primary.p04}>
          {error}
        </HeadingText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    height: 40
  },
  containerFocused: {
    elevation: 10,
  },
  containerError: {
    borderColor: Colors.primary.p04,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#FFF",
    flex: 1,
  },
  textInputFocused: {
    borderWidth: 2,
  },
  textInputError: {
    borderColor: Colors.primary.p04,
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 8,
  },
});
