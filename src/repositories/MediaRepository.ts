import { MediaCoverage } from "../models/MediaCoverage";

export interface MediaRepository {
  getMediaCoverages(): Promise<MediaCoverage[]>;
}