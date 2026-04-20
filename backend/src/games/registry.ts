import type { GameAdapter } from './types.js';
import { genericAdapter } from './generic/index.js';
import { vhAdapter } from './vh/index.js';

const registry: Record<string, GameAdapter> = {
    vh: vhAdapter,
};

export function getGameAdapter(gameKey: string): GameAdapter {
    return registry[gameKey] ?? genericAdapter;
}
