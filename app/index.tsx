import { router } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isPasswordValid = password.trim().length > 0;
  const isFormValid = isEmailValid && isPasswordValid;

  const handleLogin = () => {
    if (!isFormValid) {
      setEmailTouched(true);
      setPasswordTouched(true);
      return;
    }

    router.push("/home");
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Welcome Back
      </Text>

      <Text style={styles.subtitle}>
        Login to your account
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        onBlur={() => setEmailTouched(true)}
      />
      {emailTouched && !isEmailValid && (
        <Text style={styles.errorText}>Enter a valid email address.</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        onBlur={() => setPasswordTouched(true)}
      />
      {passwordTouched && !isPasswordValid && (
        <Text style={styles.errorText}>Password is required.</Text>
      )}

      <TouchableOpacity
        style={[styles.button, !isFormValid && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={!isFormValid}
      >
        <Text style={styles.buttonText}>
          Login
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },

  errorText: {
    color: "#D32F2F",
    marginTop: -8,
    marginBottom: 16,
    fontSize: 14,
  },

  button: {
    height: 52,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF",
  },

  buttonDisabled: {
    backgroundColor: "#A9C7E8",
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});