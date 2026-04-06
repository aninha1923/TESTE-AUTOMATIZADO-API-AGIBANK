import { test, expect } from '@playwright/test';
import { DogController } from './dog-api/dog';
import { DogHelper } from './dog-api/utils/dog.helper';
import * as fs from 'fs';
import * as path from 'path';
import * as allure from 'allure-js-commons';

test.describe('Dog CEO API - Automação de Cenários de Sucesso', () => {
  let dogController: DogController;
  const targetBreed = process.env.RACA_DOG || 'affenpinscher';
  const suiteName = 'Dog CEO API - Automação de Cenários de Sucesso';

  test.beforeEach(async ({ request }) => {
    dogController = new DogController(request);
    
    // Configurações de Suite usando a nova API
    await allure.suite(suiteName);
    await allure.parentSuite(suiteName);
    await allure.subSuite('');
  });

  test('Cenário 1: Consulta de imagem aleatória por raça específica', async () => {
    await allure.owner('QA Automation');
    await allure.feature('Consulta de Imagens');
    await allure.story(`Consulta por raça: ${targetBreed}`);
    await allure.severity('critical');
    
    await test.step(`1. Enviar requisição para buscar imagem aleatória da raça: ${targetBreed}`, async () => {
      const response = await dogController.getBreedRandomImage();
      const data = await DogHelper.validateSuccess(response);
      
      await DogHelper.validateBreedInImageUrl(data.message, targetBreed);

      await allure.description(`### ✅ Sucesso na Consulta da Raça: ${targetBreed}\n- **Raça:** ${targetBreed}\n- **URL Capturada:** ${data.message}`);
    });
  });

  test('Cenário 2: Consulta e validação de todas as raças disponíveis', async () => {
    await allure.owner('QA Automation');
    await allure.feature('Listagem de Raças');
    await allure.story('Validação da lista total de raças');
    await allure.severity('normal');

    await test.step('1. Enviar requisição para listar todas as raças de cães', async () => {
      const response = await dogController.listAllBreeds();
      const data = await DogHelper.validateSuccess(response);
      
      await DogHelper.validateBreedsListResponse(data);

      const totalFound = Object.keys(data.message).length;
      await allure.description(`### ✅ Listagem Validada com Sucesso\n- **Total de raças encontradas:** ${totalFound}`);
    });
  });

  test('Cenário 3: Consulta, persistência e evidência de imagem aleatória geral', async ({ request }, testInfo) => {
    await allure.owner('QA Automation');
    await allure.feature('Consulta de Imagens');
    await allure.story('Captura e salvamento de imagem aleatória geral');
    await allure.severity('critical');

    const data = await test.step('1. Enviar requisição para buscar imagem aleatória geral', async () => {
      const response = await dogController.getRandomImage();
      return await DogHelper.validateSuccess(response);
    });

    const imageUrl = data.message;
    await testInfo.attach('URL da Imagem Capturada', { body: imageUrl, contentType: 'text/plain' });

    const imageData = await test.step('2. Realizar download da imagem via URL capturada', async () => {
      const imageBuffer = await request.get(imageUrl);
      return await imageBuffer.body();
    });

    await test.step('3. Salvar imagem no diretório local e anexar ao relatório Allure', async () => {
      const imagesDir = path.join(__dirname, '../test-images');
      if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const ext = imageUrl.split('.').pop()?.split('?')[0] || 'jpg';
      const fileName = `dog-image-${timestamp}.${ext}`;
      const imagePath = path.join(imagesDir, fileName);
      
      fs.writeFileSync(imagePath, imageData);
      expect(fs.existsSync(imagePath)).toBeTruthy();

      await testInfo.attach('Evidência Visual 🐶', {
        body: imageData,
        contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
      });

      await allure.description(`### ✅ Imagem Salva com Sucesso\n- **Caminho:** \`test-images/${fileName}\`\n- **URL Original:** [Ver Imagem](${imageUrl})`);
    });
  });

  test('Cenário 4: Falha na validação de filtro (Raça Inexistente)', async () => {
    const invalidBreed = 'raca_inexistente_123';
    await allure.owner('QA Automation');
    await allure.feature('Validação de Filtros');
    await allure.story('Cenário de Falha Proposital');
    await allure.severity('normal');

    await test.step(`1. Testar filtro inexistente: '${invalidBreed}'`, async () => {
      const response = await dogController.getBreedRandomImage(invalidBreed);
      
      // O teste deve falhar aqui para mostrar o retorno tratado com RACA_DOG_INVALIDA
      await DogHelper.validateTreatedFailure(response, 404, invalidBreed);
      
      // Se por algum motivo o teste chegar aqui (o que não deve), ele gera a descrição
      await allure.description(`### ❌ Falha: A API não barrou o filtro de forma correta ou o teste continuou indevidamente.`);
    });
  });
});
