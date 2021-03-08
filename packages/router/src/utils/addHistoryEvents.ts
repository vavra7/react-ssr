import { HistoryEvent } from '../enums';

/**
 * While History API doesn't have pop/push events, the only
 * proper way to listen to changes is to monkey-patch these methods.
 */
export function addHistoryEvents(): void {
  if (typeof history === 'undefined') return;

  const updateList: { methodName: any; eventName: HistoryEvent }[] = [
    { methodName: 'popState', eventName: HistoryEvent.PopState },
    { methodName: 'pushState', eventName: HistoryEvent.PushState }
  ];

  for (const { methodName, eventName } of updateList) {
    const originalFce = history[methodName];
    // @ts-ignore
    history[methodName] = function () {
      const result = originalFce.apply(this, arguments);
      const event = new Event(eventName);
      dispatchEvent(event);
      return result;
    };
  }
}
