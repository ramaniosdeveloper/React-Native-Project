import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const itemDetails: Record<string, { title: string; description: string }> = {
  "1": {
    title: "Daily overview",
    description: "Review your latest activity and see what changed today.",
  },
  "2": {
    title: "Tasks",
    description: "Keep track of what needs attention and mark work as complete.",
  },
  "3": {
    title: "Messages",
    description: "See your recent conversations and stay in touch with your team.",
  },
  "4": {
    title: "Calendar",
    description: "Check upcoming events and keep your plans in one place.",
  },
  "5": {
    title: "Reports",
    description: "Explore useful summaries and insights from your activity.",
  },
  "6": {
    title: "Settings",
    description: "Manage your app preferences and personal settings.",
  },
};

export default function ItemScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = itemDetails[id] ?? itemDetails["1"];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: item.title }} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.itemNumber}>Item {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#F5F7FB",
  },
  title: {
    color: "#1B2430",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 12,
  },
  description: {
    color: "#697586",
    fontSize: 17,
    lineHeight: 25,
  },
  itemNumber: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 24,
  },
});
