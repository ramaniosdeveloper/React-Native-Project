import { MediaCoverage } from "../models/MediaCoverage";

export function getMediaImageURL(
  item: MediaCoverage
): string | null {

  const thumbnail = item.thumbnail;

  if (!thumbnail) {
    return null;
  }

  const domain = thumbnail.domain.replace(/^https?:\/\//, "");

  return `https://${domain}/${thumbnail.basePath}/0/${thumbnail.key}`;
}