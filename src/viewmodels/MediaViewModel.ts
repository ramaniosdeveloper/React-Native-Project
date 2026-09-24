import { useCallback, useState } from "react";
import { MediaCoverage } from "../models/MediaCoverage";
import { GetMediaCoverages } from "../usecases/GetMediaCoverages";

export function useMediaViewModel(getMediaCoverages: GetMediaCoverages) {
  const [media, setMedia] = useState<MediaCoverage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMedia = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getMediaCoverages.execute();

      setMedia(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }, [getMediaCoverages]);

  return {
    media,
    loading,
    error,
    fetchMedia,
  };
}
