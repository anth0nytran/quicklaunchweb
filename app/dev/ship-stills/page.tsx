import { notFound } from "next/navigation";
import Studio from "./studio";

// Local-only tool: renders the real 3D ship in each step's cutaway state on a transparent
// background, so the page sections can use stills that match the hero exactly.
// Not available in production.
export const metadata = { robots: { index: false, follow: false } };

export default function Page() {
  if (process.env.NODE_ENV === "production") notFound();
  return <Studio />;
}
