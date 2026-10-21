// Minimal types for the `odometer` package (it ships none)
declare module "odometer" {
  type OdometerOptions = {
    el: HTMLElement;
    value?: number;
    format?: string;
    theme?: string;
    duration?: number;
  };

  export default class Odometer {
    constructor(options: OdometerOptions);
    update(value: number): void;
  }
}
