export default function useOnClickOutside(
  event: MouseEvent,
  dataAttribute: string,
  handler: () => void
) {
  if (!dataAttribute) return;
  const target = event.target as HTMLElement;
  const isAnyClosestFound = !!target.closest(`[data-${dataAttribute}]`);

  if (!isAnyClosestFound) {
    handler();
  }
}
