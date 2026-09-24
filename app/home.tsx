import { router } from "expo-router";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const items = [
  { id: "1", title: "User Profile", description: "Review your latest activity." },
  { id: "2", title: "Tasks", description: "Keep track of what needs attention." },
  { id: "3", title: "Messages", description: "See your recent conversations." },
  { id: "4", title: "Calendar", description: "Check upcoming events and plans." },
  { id: "5", title: "Reports", description: "Explore useful summaries and insights." },
  { id: "6", title: "Settings", description: "Manage your app preferences." },
];

export default function HomeScreen() {
  const handleLogout = () => {
    router.replace("/");
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Home</Text>
          <Text style={styles.subtitle}>Choose an item to continue</Text>
        </View>
        <Pressable onPress={handleLogout} accessibilityRole="button">
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
  onPress={() => {
  if (item.id === "1") {
    router.push("/user-profile");
  } else if (item.id === "2") {
    router.push("/tasks");
  } else {
    router.push({
      pathname: "/item/[id]",
      params: { id: item.id },
    });
  }
}}
            accessibilityRole="button"
          >
            <View style={styles.itemText}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F5F7FB",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },

  logoutText: {
    color: "#007AFF",
    fontSize: 15,
    fontWeight: "600",
  },

  list: {
    gap: 12,
  },

  item: {
    minHeight: 82,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E4E8EF",
  },

  itemPressed: {
    opacity: 0.7,
  },

  itemText: {
    flex: 1,
    paddingRight: 12,
  },

  itemTitle: {
    color: "#1B2430",
    fontSize: 17,
    fontWeight: "600",
  },

  itemDescription: {
    color: "#697586",
    fontSize: 14,
    marginTop: 5,
  },

  arrow: {
    color: "#007AFF",
    fontSize: 28,
    lineHeight: 28,
  },
});