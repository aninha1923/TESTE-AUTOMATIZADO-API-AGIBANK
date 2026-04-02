import { test, expect } from '@playwright/test';
import { DogController } from './dog.controller';
import { DogHelper } from './dog.helper';
import * as fs from 'fs';
import * as path from 'path';


test.describe('Dog CEO API - Cenários de Sucesso', () => {
  let dogController: DogController;

  test.beforeEach(async ({ request }) => {
    dogController = new DogController(request);
  });

  test('Deve consultar imagem aleatória de Affenpinscher com sucesso', async () => {
    const response = await dogController.consultarImagemAffenpinscher();

    expect(response.status()).toBe(200);
    const data = await response.json();
    
    expect(() => DogHelper.validateImageResponse(data)).not.toThrow();
    expect(() => DogHelper.validateBreedInImageUrl(data.message, 'affenpinscher')).not.toThrow();
  });

  test('Deve listar todas as raças de cães com sucesso', async () => {
    const response = await dogController.listarTodasRacas();

    expect(response.status()).toBe(200);
    const data = await response.json();
    
    expect(() => DogHelper.validateBreedsListResponse(data)).not.toThrow();
    expect(() => DogHelper.validateBreedExists(data, 'affenpinscher')).not.toThrow();
  });

  test('Deve consultar imagem aleatória geral com sucesso', async ({ request }) => {
    const response = await dogController.consultarImagemAleatoria();

    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(() => DogHelper.validateImageResponse(data)).not.toThrow();


    const imageUrl = data.message;
    console.log(`✅ URL da imagem capturada: ${imageUrl}`);

  
    const imageBuffer = await request.get(imageUrl);
    const imageData = await imageBuffer.body();
    
    const imagesDir = path.join(__dirname, '../test-images');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileExtension = imageUrl.split('.').pop()?.split('?')[0] || 'jpg';
    const imagePath = path.join(imagesDir, `dog-image-${timestamp}.${fileExtension}`);
    
    fs.writeFileSync(imagePath, imageData);
    console.log(`✅ Imagem salva em: ${imagePath}`);
    expect(fs.existsSync(imagePath)).toBeTruthy();
  });
});


