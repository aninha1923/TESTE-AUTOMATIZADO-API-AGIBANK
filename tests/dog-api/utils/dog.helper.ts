import * as allure from 'allure-js-commons';

export class DogHelper {

  /**
   * Validação para Cenários de Sucesso (1, 2 e 3)
   */
  static async validateSuccess(response: any): Promise<any> {
    return await allure.step('Validar retorno de sucesso (200 OK)', async () => {
      const status = typeof response.status === 'function' ? response.status() : response.status;
      const data = await response.json().catch(() => ({}));

      if (status !== 200) {
        await allure.attachment('JSON de Erro Inesperado', JSON.stringify(data, null, 2), 'application/json');
        throw new Error(`❌ ERRO NO CENÁRIO DE SUCESSO: Esperávamos 200, mas a API retornou ${status}.`);
      }

      if (data.status !== 'success') {
        await allure.attachment('Resposta da API', JSON.stringify(data, null, 2), 'application/json');
        throw new Error(`❌ ERRO NO CORPO DA RESPOSTA: Status no JSON veio como '${data.status}' em vez de 'success'.`);
      }

      return data;
    });
  }

  /**
   * Validação para o Cenário 4 (Tratamento de Erro de Filtro)
   * Este método força a falha do teste com um retorno tratado.
   */
  static async validateTreatedFailure(response: any, expectedStatus: number, breedName: string): Promise<void> {
    await allure.step('Validar retorno tratado de erro no filtro', async () => {
      const status = typeof response.status === 'function' ? response.status() : response.status;
      const data = await response.json().catch(() => ({}));

      // Anexa sempre para que o usuário veja no relatório Allure
      await allure.attachment('JSON de Resposta da API (Tratamento de Erro)', JSON.stringify(data, null, 2), 'application/json');

      if (status === expectedStatus) {
        // Lançamos a falha com a mensagem simplificada
        throw new Error(
          `❌ FALHA NO FILTRO: A raça pesquisada não existe.\n` +
          `- MOTIVO: Filtro utilizado não retornou resultados (${status} Not Found)\n` +
          `- DETALHE API: ${data.message}`
        );
      } else {
        throw new Error(`❌ ERRO NÃO ESPERADO: Esperávamos o status ${expectedStatus}, mas a API retornou ${status}.`);
      }
    });
  }

  static async validateBreedsListResponse(data: any): Promise<void> {
    await allure.step('Validar integridade da lista de raças', async () => {
      if (!data.message || typeof data.message !== 'object') {
        throw new Error('❌ FALHA TRATADA: O campo message não é um objeto de raças.');
      }
    });
  }

  static async validateBreedInImageUrl(imageUrl: string, breedName: string): Promise<void> {
    await allure.step(`Validar se a raça '${breedName}' está na URL`, async () => {
      if (!imageUrl.toLowerCase().includes(breedName.toLowerCase())) {
        throw new Error(`❌ FALHA TRATADA: A raça '${breedName}' não foi encontrada na URL da imagem.`);
      }
    });
  }
}
