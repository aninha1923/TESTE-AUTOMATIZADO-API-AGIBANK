import { APIRequestContext, APIResponse } from '@playwright/test';

export class DogController {
  constructor(private readonly request: APIRequestContext) {}

  /**
   * Cenário 1 e 4: Consulta imagem aleatória por raça (sucesso ou erro)
   */
  async getBreedRandomImage(breedName?: string): Promise<APIResponse> {
    const breed = breedName || process.env.RACA_DOG;
    const baseUrl = process.env.URL_PADRAO;
    return await this.request.get(`${baseUrl}/breed/${breed}/images/random`);
  }

  /**
   * Cenário 2: Lista todas as raças
   */
  async listAllBreeds(): Promise<APIResponse> {
    const baseUrl = process.env.URL_PADRAO;
    return await this.request.get(`${baseUrl}/breeds/list/all`);
  }

  /**
   * Cenário 3: Consulta imagem aleatória geral
   */
  async getRandomImage(): Promise<APIResponse> {
    const randomUrl = process.env.URL_RANDOM;
    return await this.request.get(`${randomUrl}/image/random`);
  }
}
