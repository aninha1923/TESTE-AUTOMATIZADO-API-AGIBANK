import { test as base } from '@playwright/test';
import { DogSteps } from '../steps/dog.steps';

type MyFixtures = {
  dogSteps: DogSteps;
};

export const test = base.extend<MyFixtures>({
  dogSteps: async ({ request }, use, testInfo) => {
    const steps = new DogSteps(request, testInfo);
    await use(steps);
  },
});

export { expect } from '@playwright/test';
