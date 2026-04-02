import { APIRequestContext, APIResponse } from '@playwright/test';


export class DogController {
  constructor(private readonly request: APIRequestContext) {}

  async consultarImagemAffenpinscher(): Promise<APIResponse> {
    return await this.request.get(
      `${process.env.URL_PADRAO}/breed/${process.env.RACA_DOG}/images/random`
    );
  }

  async listarTodasRacas(): Promise<APIResponse> {
    return await this.request.get(
      `${process.env.URL_PADRAO}/breeds/list/all`
    );
  }

  async consultarImagemAleatoria(): Promise<APIResponse> {
    return await this.request.get(
      `${process.env.URL_RANDOM}/image/random`
    );
  }
}
