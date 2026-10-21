// Resolves when the loading screen has finished its shutter animation, so other parts
// (banner intro, smooth scroll) can wait for it. One shared promise per page load.
let resolveDone: () => void = () => {};

export const loaderDone = new Promise<void>((resolve) => {
  resolveDone = resolve;
});

export const finishLoader = () => resolveDone();
