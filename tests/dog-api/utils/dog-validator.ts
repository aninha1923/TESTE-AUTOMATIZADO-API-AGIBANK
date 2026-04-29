import { expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

export class DogValidator {
  static async validateSuccessResponse(response: any) {
    await allure.step('Validar resposta de sucesso da API', async () => {
      expect(response.status).toBe('success');
      expect(response.message).toBeDefined();
    });
  }

  static async validateBreedInUrl(imageUrl: string, breed: string) {
    await allure.step(`Validar se a raça '${breed}' está presente na URL`, async () => {
      expect(imageUrl.toLowerCase()).toContain(breed.toLowerCase());
    });
  }

  static async validateErrorResponse(response: any, expectedMessage: string) {
    await allure.step('Validar resposta de erro tratada', async () => {
      expect(response.status).toBe('error');
      expect(response.message).toContain(expectedMessage);
    });
  }
}
