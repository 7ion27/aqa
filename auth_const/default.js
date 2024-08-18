import { test as base, chromium } from '@playwright/test'
import { getArgs } from './function'

export const test = base.extend({
  context: async ({ }, use) => {
    const context = await chromium.launchPersistentContext(``, {
      headless: process.env.MODE == `headless`,
      args: [
        ...getArgs(),
      ],
    });
    await use(context);
    await context.close();
  },
});