/// <reference path="globals/pixi.js/index.d.ts" />

//Enable json import through wildcard
// declare module "*.json" {
//     const value: any;
//     export default value;
// }
declare module '*.json' { export default '' as any; }
