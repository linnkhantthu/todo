import LoadingSkeleton from "./components/LoadingSkeleton";

export default function Loading({ dataLength }: { dataLength: number }) {
  // You can add any UI inside Loading, including a Skeleton.
  return <LoadingSkeleton dataLength={dataLength} />;
}
