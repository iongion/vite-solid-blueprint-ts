// tslint:disable:object-literal-sort-keys

/**
 * The four basic intents.
 */
export const Intent = {
  NONE: 'none' as 'none',
  PRIMARY: 'primary' as 'primary',
  SUCCESS: 'success' as 'success',
  WARNING: 'warning' as 'warning',
  DANGER: 'danger' as 'danger',
};
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Intent = typeof Intent[keyof typeof Intent];
