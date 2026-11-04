import ServiceLandingPage from "@/components/pages/service-landing-page";
import { StructuredData } from "@/components/seo/StructuredData";
import { facebookAdsLanding } from "@/lib/serviceLandingData";
import { serviceLandingMetadata, serviceLandingSchema } from "@/lib/serviceLandingMeta";

export const metadata = serviceLandingMetadata(facebookAdsLanding);

export default function FacebookAdsPage() {
  return (
    <>
      <StructuredData data={serviceLandingSchema(facebookAdsLanding)} />
      <ServiceLandingPage content={facebookAdsLanding} />
    </>
  );
}
