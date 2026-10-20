import type { Metadata } from "next";
import { images, ogDefault, type ImageKey } from "@/lib/images";
import { site } from "@/lib/site";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  /** Si vrai, le titre n'est pas complété par « | Nettoyage Perpignan ». */
  absoluteTitle?: boolean;
  image?: ImageKey;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  noindex = false,
}: MetaInput): Metadata {
  const og = image
    ? { url: images[image].src, width: images[image].width, height: images[image].height, alt: images[image].alt }
    : { url: ogDefault.src, width: ogDefault.width, height: ogDefault.height, alt: site.name };
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      locale: site.locale,
      siteName: site.name,
      url: path,
      title: fullTitle,
      description,
      images: [og],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [og.url],
    },
  };
}
