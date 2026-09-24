import { MediaCoverage } from "../models/MediaCoverage";
import { MediaRepository } from "../repositories/MediaRepository";

export class GetMediaCoverages {

  constructor(
    private repository: MediaRepository
  ) {}

  async execute(): Promise<MediaCoverage[]> {
    return await this.repository.getMediaCoverages();
  }
}