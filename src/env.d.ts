/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "cuelume" {
  export function bind(): void;
  export function play(sound?: string): void;
}
