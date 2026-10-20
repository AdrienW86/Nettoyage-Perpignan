import { ServicePage } from "@/components/service/ServicePage";
import { getService } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

const service = getService("nuisibles");

export const metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: service.path,
  absoluteTitle: true,
  image: service.heroImage,
});

export default function Page() {
  return <ServicePage service={service} />;
}
