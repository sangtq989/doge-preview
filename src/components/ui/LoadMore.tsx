import Circle from "./Circle";

export default function LoadMore() {
  return (
    <div className="relative rounded-xl overflow-auto p-8">
      <div className="flex justify-center">
        <Circle></Circle>
        Fetching some doge...
      </div>
    </div>
  );
}
