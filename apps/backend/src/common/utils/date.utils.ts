import ms, { StringValue } from 'ms';

export function addDuration(duration: StringValue): Date {
  return new Date(Date.now() + ms(duration));
}