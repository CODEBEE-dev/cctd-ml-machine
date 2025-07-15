/**
 * (c) 2023-2025, Center for Computational Thinking and Design at Aarhus University and contributors
 *
 * SPDX-License-Identifier: MIT
 */

import { writable, type Writable, get, derived } from 'svelte/store';

const base = import.meta.env.BASE_URL ?? '/';

export const Paths = {
  HOME: base,
  PLAYGROUND: `${base}playground`,
  DATA: `${base}data`,
  TRAINING: `${base}training`,
  VALIDATE: `${base}validate`,
  MODEL: `${base}model`,
  FILTERS: `${base}training/filters`,
} as const;

export type PathType = (typeof Paths)[keyof typeof Paths];

export const currentPathPrivate: Writable<PathType> = writable(Paths.HOME);
export const currentPath = derived(currentPathPrivate, path => path);

export function navigate(path: PathType) {
  if (path === get(currentPath)) {
    return;
  }
  currentPathPrivate.set(path);
}
