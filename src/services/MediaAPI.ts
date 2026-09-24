import { MediaCoverage } from "../models/MediaCoverage";

const BASE_URL =
  "https://acharyaprashant.org/api/v2/content/misc";

export class MediaAPI {

  async getMediaCoverages(): Promise<MediaCoverage[]> {

    const response = await fetch(
      `${BASE_URL}/media-coverages?limit=50`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch media coverage. Status: ${response.status}`
      );
    }

    const data: MediaCoverage[] =
      await response.json();

    return data;
  }
}