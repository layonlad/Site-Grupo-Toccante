import Site from "./site";
import { metadataFor } from "./metadata";
export const metadata = metadataFor("inicio");
export default function Home() {
  return <Site page="inicio" />;
}
