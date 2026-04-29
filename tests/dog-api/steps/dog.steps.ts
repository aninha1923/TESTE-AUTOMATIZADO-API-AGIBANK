import { APIRequestContext, APIResponse, expect, TestInfo } from '@playwright/test';
import { DogController } from '../support/dog-controller';
import { DogValidator } from '../utils/dog-validator';
import { ImageStorageService } from '../services/image-storage';
import * as allure from 'allure-js-commons';

export class DogSteps {
  private dogController: DogController;

  constructor(private readonly request: APIRequestContext, private readonly testInfo: TestInfo) {
    this.dogController = new DogController(request);
  }

  async givenIAmAnAuthorizedUser() {
    await allure.step('Dado que sou um usuário autorizado', async () => {
    });
  }

  async whenIRequestARandomImageOfBreed(breed: string) {
    return await allure.step(`Quando eu solicito uma imagem aleatória da raça '${breed}'`, async () => {
      const response = await this.dogController.getBreedRandomImage(breed);
      expect(response.status()).toBe(200);
      return await response.json();
    });
  }

  async whenIRequestAllAvailableBreeds() {
    return await allure.step('Quando eu solicito a lista de todas as raças disponíveis', async () => {
      const response = await this.dogController.listAllBreeds();
      expect(response.status()).toBe(200);
      return await response.json();
    });
  }

  async whenIRequestAGeneralRandomImage() {
    return await allure.step('Quando eu solicito uma imagem aleatória geral', async () => {
      const response = await this.dogController.getRandomImage();
      expect(response.status()).toBe(200);
      return await response.json();
    });
  }

  async thenTheImageShouldBeOfBreed(imageUrl: string, breed: string) {
    await DogValidator.validateBreedInUrl(imageUrl, breed);
  }

  async thenTheResponseShouldBeSuccessful(data: any) {
    await DogValidator.validateSuccessResponse(data);
  }

  async thenISeeTheTotalCountOfBreeds(data: any) {
    await allure.step('Então eu vejo o total de raças encontradas', async () => {
      const totalFound = Object.keys(data.message).length;
      await allure.description(`### ✅ Listagem Validada\n- **Total de raças:** ${totalFound}`);
    });
  }

  async thenISaveTheImageToDisk(imageUrl: string) {
    await allure.step('Então eu salvo a imagem no disco e anexo ao relatório', async () => {
      const response = await this.request.get(imageUrl);
      const buffer = await response.body();
      
      const fileName = await ImageStorageService.saveImage(buffer, imageUrl);
      
      await this.testInfo.attach('Evidência Visual 🐶', {
        body: buffer,
        contentType: 'image/jpeg',
      });

      await allure.description(`### ✅ Imagem Persistida\n- **Arquivo:** ${fileName}\n- [Ver Online](${imageUrl})`);
    });
  }

  async whenIRequestAnImageOfInvalidBreed(invalidBreed: string) {
    return await allure.step(`Quando eu solicito uma imagem da raça inválida '${invalidBreed}'`, async () => {
      const response = await this.dogController.getBreedRandomImage(invalidBreed);
      expect(response.status()).toBe(200);
      return await response.json();
    });
  }

  async thenIReceiveAnErrorMessage(data: any, expectedMessage: string) {
    await DogValidator.validateErrorResponse(data, expectedMessage);
  }
}
