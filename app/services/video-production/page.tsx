import ServiceLandingPage from "@/components/pages/service-landing-page";
import { StructuredData } from "@/components/seo/StructuredData";
import { videoProductionLanding } from "@/lib/serviceLandingData";
import { serviceLandingMetadata, serviceLandingSchema } from "@/lib/serviceLandingMeta";

export const metadata = serviceLandingMetadata(videoProductionLanding);

export default function VideoProductionPage() {
  return (
    <>
      <StructuredData data={serviceLandingSchema(videoProductionLanding)} />
      <ServiceLandingPage content={videoProductionLanding} />
    </>
  );
}
