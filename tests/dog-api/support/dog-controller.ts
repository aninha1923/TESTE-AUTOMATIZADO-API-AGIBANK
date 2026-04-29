import { APIRequestContext, APIResponse } from '@playwright/test';
import { API_CONFIG } from './api-config';

export class DogController {
  constructor(private readonly request: APIRequestContext) {}

  async getBreedRandomImage(breed?: string): Promise<APIResponse> {
    const targetBreed = breed || API_CONFIG.defaultBreed;
    return await this.request.get(`${API_CONFIG.baseUrl}/breed/${targetBreed}/images/random`);
  }

  async listAllBreeds(): Promise<APIResponse> {
    return await this.request.get(`${API_CONFIG.baseUrl}/breeds/list/all`);
  }

  async getRandomImage(): Promise<APIResponse> {
    return await this.request.get(`${API_CONFIG.randomUrl}/image/random`);
  }
}
