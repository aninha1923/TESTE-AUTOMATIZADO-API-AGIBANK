import { test } from '../support/fixtures';
import { API_CONFIG } from '../support/api-config';
import * as allure from 'allure-js-commons';

test.describe('Dog CEO API - Feature: Consulta de Imagens (BDD)', () => {

  test.beforeEach(async () => {
    await allure.suite('Regressão de API');
    await allure.parentSuite('Dog CEO');
  });

  test('Cenário: Consultar imagem aleatória por raça com sucesso', async ({ dogSteps }) => {
    const breed = API_CONFIG.defaultBreed;
    
    await dogSteps.givenIAmAnAuthorizedUser();
    const data = await dogSteps.whenIRequestARandomImageOfBreed(breed);
    await dogSteps.thenTheResponseShouldBeSuccessful(data);
    await dogSteps.thenTheImageShouldBeOfBreed(data.message, breed);
  });

  test('Cenário: Validar inventário completo de raças', async ({ dogSteps }) => {
    await dogSteps.givenIAmAnAuthorizedUser();
    const data = await dogSteps.whenIRequestAllAvailableBreeds();
    await dogSteps.thenTheResponseShouldBeSuccessful(data);
    await dogSteps.thenISeeTheTotalCountOfBreeds(data);
  });

  test('Cenário: Persistir evidência de imagem aleatória geral', async ({ dogSteps }) => {
    await dogSteps.givenIAmAnAuthorizedUser();
    const data = await dogSteps.whenIRequestAGeneralRandomImage();
    await dogSteps.thenTheResponseShouldBeSuccessful(data);
    await dogSteps.thenISaveTheImageToDisk(data.message);
  });

  test('Cenário: Erro ao consultar raça não existente', async ({ dogSteps }) => {
    const invalidBreed = 'non_existent_dog_123';
    
    await dogSteps.givenIAmAnAuthorizedUser();
    const data = await dogSteps.whenIRequestAnImageOfInvalidBreed(invalidBreed);
    await dogSteps.thenIReceiveAnErrorMessage(data, 'Breed not found');
  });
});
