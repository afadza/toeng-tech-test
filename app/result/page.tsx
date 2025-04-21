import { Suspense } from "react";
import ResultContent from "./ResultContent";

export default function Result() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  );
}
