import { useEffect } from "react";

import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { getUsersUseCase } from "../src/di/UserDependencies";
import { useUserViewModel } from "../src/viewmodels/UserViewModel";

export default function UserProfileScreen() {
  const {
    users,
    loading,
    error,
    fetchUsers,
  } = useUserViewModel(getUsersUseCase);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Loading users...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        User Profile
      </Text>

      <Text style={styles.subtitle}>
        Total Users: {users.length}
      </Text>

      <FlatList
        data={users}
        keyExtractor={(item) =>
          item.id.toString()
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>

            <View style={styles.headerRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {item.name.charAt(0)}
                </Text>
              </View>

              <View style={styles.nameContainer}>
                <Text style={styles.name}>
                  {item.name}
                </Text>

                <Text style={styles.username}>
                  @{item.username}
                </Text>
              </View>
            </View>

            <View style={styles.separator} />

            <Text style={styles.label}>
              Email
            </Text>

            <Text style={styles.value}>
              {item.email}
            </Text>

            <Text style={styles.label}>
              Phone
            </Text>

            <Text style={styles.value}>
              {item.phone}
            </Text>

            <Text style={styles.label}>
              Company
            </Text>

            <Text style={styles.value}>
              {item.company.name}
            </Text>

            <Text style={styles.label}>
              Location
            </Text>

            <Text style={styles.value}>
              {item.address.city}
            </Text>

          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1B2430",
    marginTop: 20,
  },

  subtitle: {
    fontSize: 15,
    color: "#697586",
    marginTop: 5,
    marginBottom: 18,
  },

  list: {
    paddingBottom: 20,
    gap: 12,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E4E8EF",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },

  nameContainer: {
    marginLeft: 12,
    flex: 1,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1B2430",
  },

  username: {
    color: "#007AFF",
    marginTop: 3,
  },

  separator: {
    height: 1,
    backgroundColor: "#E4E8EF",
    marginVertical: 14,
  },

  label: {
    fontSize: 12,
    color: "#697586",
    marginTop: 8,
  },

  value: {
    fontSize: 15,
    color: "#1B2430",
    marginTop: 2,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    color: "#697586",
  },

  error: {
    color: "#D32F2F",
  },
});