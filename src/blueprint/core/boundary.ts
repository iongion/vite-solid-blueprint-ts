/** Boundary of a one-dimensional interval. */
export const Boundary = {
  START: "start" as "start",
  // tslint:disable-next-line:object-literal-sort-keys
  END: "end" as "end",
};
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Boundary = typeof Boundary[keyof typeof Boundary];
