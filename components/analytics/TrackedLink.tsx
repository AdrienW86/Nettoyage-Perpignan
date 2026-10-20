"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackEvent, type TrackEvent } from "@/lib/analytics";

type Props = ComponentProps<"a"> & { event: TrackEvent; location: string };

/** Lien (téléphone, e-mail, CTA devis) dont le clic est mesuré. */
export function TrackedLink({ event, location, onClick, href = "#", ...rest }: Props) {
  const handle: Props["onClick"] = (e) => {
    trackEvent(event, { location });
    onClick?.(e);
  };
  if (href.startsWith("/")) {
    return <Link href={href} onClick={handle} {...rest} />;
  }
  return <a href={href} onClick={handle} {...rest} />;
}
