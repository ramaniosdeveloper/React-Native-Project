import { MediaCoverage } from "../models/MediaCoverage";
import { MediaAPI } from "../services/MediaAPI";
import { MediaRepository } from "./MediaRepository";

export class MediaRepositoryImpl
  implements MediaRepository {

  constructor(private api: MediaAPI) {}

  async getMediaCoverages(): Promise<MediaCoverage[]> {
    return await this.api.getMediaCoverages();
  }
}