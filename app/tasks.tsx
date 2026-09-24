import { Image } from "expo-image";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Linking,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getMediaCoveragesUseCase } from "../src/di/MediaDependencies";
import { MediaCoverage } from "../src/models/MediaCoverage";
import { getMediaImageURL } from "../src/utils/MediaImageURL";
import { useMediaViewModel } from "../src/viewmodels/MediaViewModel";

export default function TasksScreen() {
  const {
    media,
    loading,
    error,
    fetchMedia,
  } = useMediaViewModel(getMediaCoveragesUseCase);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const handleOpenURL = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log("Cannot open URL:", url);
      }
    } catch (error) {
      console.log("Error opening URL:", error);
    }
  };

  const renderMediaItem = ({
    item,
  }: {
    item: MediaCoverage;
  }) => {
    const imageURL = getMediaImageURL(item);

    return (
      <Pressable
        style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}
        onPress={() => handleOpenURL(item.coverageURL)}
      >
        <View style={styles.row}>

          {/* LEFT IMAGE */}
          {imageURL ? (
            <Image
              source={imageURL}
              style={styles.thumbnail}
              contentFit="cover"
              contentPosition="center"
              onError={(event) => {
                console.log(
                  "IMAGE LOAD ERROR:",
                  event.error
                );

                console.log(
                  "IMAGE URL:",
                  imageURL
                );
              }}
            />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>
                AP
              </Text>
            </View>
          )}

          {/* RIGHT CONTENT */}
          <View style={styles.content}>

            {/* Publisher */}
            <Text
              style={styles.source}
              numberOfLines={1}
            >
              {item.publishedBy || "Media Coverage"}
            </Text>

            {/* Title */}
            <Text
              style={styles.cardTitle}
              numberOfLines={3}
            >
              {item.title || "Untitled"}
            </Text>

            {/* Description */}
            {item.description ? (
              <Text
                style={styles.description}
                numberOfLines={3}
              >
                {item.description}
              </Text>
            ) : null}

            {/* Footer */}
            <View style={styles.footer}>

              <Text style={styles.language}>
                {item.language
                  ? item.language.toUpperCase()
                  : "EN"}
              </Text>

              <Text style={styles.readMore}>
                Read →
              </Text>

            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Media Coverage
        </Text>

        <Text style={styles.subtitle}>
          Latest media and news coverage
        </Text>
      </View>

      {/* LOADING */}
      {loading && media.length === 0 ? (
        <View style={styles.center}>
          <ActivityIndicator
            size="large"
            color="#007AFF"
          />

          <Text style={styles.loadingText}>
            Loading media...
          </Text>
        </View>
      ) : null}

      {/* ERROR */}
      {error && media.length === 0 ? (
        <View style={styles.center}>

          <Text style={styles.errorTitle}>
            Unable to load media
          </Text>

          <Text style={styles.errorText}>
            {error}
          </Text>

          <Pressable
            style={styles.retryButton}
            onPress={fetchMedia}
          >
            <Text style={styles.retryText}>
              Retry
            </Text>
          </Pressable>

        </View>
      ) : null}

      {/* MEDIA LIST */}
      {!loading || media.length > 0 ? (
        <FlatList
          data={media}
          keyExtractor={(item, index) =>
            item.id
              ? String(item.id)
              : String(index)
          }
          renderItem={renderMediaItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}

          refreshing={loading}
          onRefresh={fetchMedia}

          ListEmptyComponent={
            !loading ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  No media coverage found.
                </Text>
              </View>
            ) : null
          }
        />
      ) : null}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  /* HEADER */

  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E4E8EF",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1B2430",
  },

  subtitle: {
    fontSize: 14,
    color: "#697586",
    marginTop: 4,
  },

  /* LIST */

  list: {
    padding: 16,
    paddingBottom: 30,
  },

  /* CARD */

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,

    borderWidth: 1,
    borderColor: "#E4E8EF",

    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  cardPressed: {
    opacity: 0.7,
  },

  /* IMAGE + CONTENT */

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  thumbnail: {
    width: 110,
    height: 110,
    borderRadius: 10,
    backgroundColor: "#E5E7EB",
  },

  placeholder: {
    width: 110,
    height: 110,
    borderRadius: 10,
    backgroundColor: "#E5E7EB",

    justifyContent: "center",
    alignItems: "center",
  },

  placeholderText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#697586",
  },

  content: {
    flex: 1,
    marginLeft: 14,
    minHeight: 110,
  },

  /* TEXT */

  source: {
    fontSize: 12,
    fontWeight: "600",
    color: "#007AFF",
    marginBottom: 5,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1B2430",
    lineHeight: 21,
  },

  description: {
    fontSize: 13,
    color: "#697586",
    lineHeight: 18,
    marginTop: 6,
  },

  /* FOOTER */

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },

  language: {
    fontSize: 11,
    fontWeight: "600",
    color: "#697586",
  },

  readMore: {
    fontSize: 12,
    fontWeight: "600",
    color: "#007AFF",
  },

  /* LOADING */

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: "#697586",
  },

  /* ERROR */

  errorTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1B2430",
    marginBottom: 8,
  },

  errorText: {
    fontSize: 14,
    color: "#697586",
    textAlign: "center",
    marginBottom: 20,
  },

  retryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },

  retryText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  /* EMPTY */

  emptyContainer: {
    paddingTop: 50,
    alignItems: "center",
  },

  emptyText: {
    fontSize: 14,
    color: "#697586",
  },
});