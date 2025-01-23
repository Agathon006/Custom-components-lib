export default function useOnClickOutside(
  event: MouseEvent,
  dataAttributes: string[],
  handler: () => void
) {
  const target = event.target as HTMLElement;

  if (!dataAttributes || dataAttributes.length === 0) {
    handler();
    return;
  }

  const isAnyClosestFound = dataAttributes.some(attribute => {
    return !!target.closest(`[data-${attribute}]`);
  });

  if (!isAnyClosestFound) {
    handler();
  }
}
