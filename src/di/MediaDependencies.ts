import { MediaRepositoryImpl } from "../repositories/MediaRepositoryImpl";
import { MediaAPI } from "../services/MediaAPI";
import { GetMediaCoverages } from "../usecases/GetMediaCoverages";

const mediaAPI = new MediaAPI();

const mediaRepository =
  new MediaRepositoryImpl(mediaAPI);

export const getMediaCoveragesUseCase =
  new GetMediaCoverages(mediaRepository);