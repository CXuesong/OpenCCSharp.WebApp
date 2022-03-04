/**
 * This is the fallback scss module that makes ForkTsCheckerWebpackPlugin happy.
 * typings-for-css-modules-loader is not generating .d.ts files early enough.
 */
declare module "*.scss" {
  const classNames: Record<string, string>;
  export default classNames;
}

declare interface PerformanceMemory {
  readonly jsHeapSizeLimit: number;
  readonly totalJSHeapSize: number;
  readonly usedJSHeapSize: number;
}

declare interface Performance {
  readonly memory?: PerformanceMemory;
}
