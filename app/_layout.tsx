import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Login",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />

      <Stack.Screen
        name="tasks"
        options={{
          title: "Tasks",
        }}
      />

      <Stack.Screen
        name="user-profile"
        options={{
          title: "User Profile",
        }}
      />

      <Stack.Screen
        name="item/[id]"
        options={{
          title: "Item",
        }}
      />
    </Stack>
  );
}