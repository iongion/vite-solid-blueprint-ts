// tslint:disable:object-literal-sort-keys
export const Elevation = {
  ZERO: 0 as 0,
  ONE: 1 as 1,
  TWO: 2 as 2,
  THREE: 3 as 3,
  FOUR: 4 as 4,
};
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Elevation = typeof Elevation[keyof typeof Elevation];
