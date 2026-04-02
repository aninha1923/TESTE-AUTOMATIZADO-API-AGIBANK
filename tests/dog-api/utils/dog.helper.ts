import { APIResponse } from '@playwright/test';

export class DogHelper {

  static validateSuccessResponse(data: any): void {
    if (!data) {
      throw new Error(
        `❌ FALHA: Resposta vazia ou nula\n` +
        `Dados recebidos: ${JSON.stringify(data, null, 2)}`
      );
    }
    if (data.status !== 'success') {
      throw new Error(
        `❌ FALHA: Status de resposta inválido\n` +
        `Esperado: 'success'\n` +
        `Recebido: '${data.status}'\n` +
        `Resposta completa: ${JSON.stringify(data, null, 2)}`
      );
    }
  }

  static validateImageResponse(data: any): void {
    try {
      this.validateSuccessResponse(data);
    } catch (error) {
      throw new Error(
        `❌ FALHA ao validar resposta de imagem\n` +
        `${error instanceof Error ? error.message : String(error)}`
      );
    }
    
    if (!data.message) {
      throw new Error(
        `❌ FALHA: Campo 'message' não encontrado\n` +
        `Resposta completa: ${JSON.stringify(data, null, 2)}`
      );
    }
    
    if (typeof data.message !== 'string') {
      throw new Error(
        `❌ FALHA: Message deve ser string (URL da imagem)\n` +
        `Tipo recebido: ${typeof data.message}\n` +
        `Valor: ${JSON.stringify(data.message)}`
      );
    }
    
    if (!data.message.match(/\.(jpg|jpeg|png|gif)$/i)) {
      throw new Error(
        `❌ FALHA: URL da imagem inválida\n` +
        `Extensão esperada: .jpg, .jpeg, .png ou .gif\n` +
        `URL recebida: ${data.message}\n` +
        `Extensão detectada: ${this.getFileExtension(data.message) || 'nenhuma'}`
      );
    }
  }

  static validateBreedsListResponse(data: any): void {
    try {
      this.validateSuccessResponse(data);
    } catch (error) {
      throw new Error(
        `❌ FALHA ao validar resposta de raças\n` +
        `${error instanceof Error ? error.message : String(error)}`
      );
    }
    
    if (!data.message || typeof data.message !== 'object') {
      throw new Error(
        `❌ FALHA: Message deve ser objeto (lista de raças)\n` +
        `Tipo recebido: ${typeof data.message}\n` +
        `Valor: ${JSON.stringify(data.message)}`
      );
    }
    
    const breedCount = Object.keys(data.message).length;
    if (breedCount === 0) {
      throw new Error(
        `❌ FALHA: Lista de raças está vazia\n` +
        `Total de raças: ${breedCount}\n` +
        `Resposta completa: ${JSON.stringify(data, null, 2)}`
      );
    }
  }

  static validateBreedExists(data: any, breedName: string): void {
    try {
      this.validateBreedsListResponse(data);
    } catch (error) {
      throw new Error(
        `❌ FALHA ao validar existência da raça '${breedName}'\n` +
        `${error instanceof Error ? error.message : String(error)}`
      );
    }
    
    if (!data.message.hasOwnProperty(breedName)) {
      const availableBreeds = Object.keys(data.message).slice(0, 5).join(', ');
      throw new Error(
        `❌ FALHA: Raça '${breedName}' não encontrada\n` +
        `Total de raças disponíveis: ${Object.keys(data.message).length}\n` +
        `Exemplos: ${availableBreeds}...\n` +
        `Raças buscadas: ${Object.keys(data.message).join(', ')}`
      );
    }
    
    if (!Array.isArray(data.message[breedName])) {
      throw new Error(
        `❌ FALHA: Dados da raça '${breedName}' devem ser array\n` +
        `Tipo recebido: ${typeof data.message[breedName]}\n` +
        `Valor: ${JSON.stringify(data.message[breedName])}`
      );
    }
  }

  static validateBreedInImageUrl(imageUrl: string, breedName: string): void {
    if (!imageUrl.toLowerCase().includes(breedName.toLowerCase())) {
      throw new Error(
        `❌ FALHA: Raça '${breedName}' não encontrada na URL\n` +
        `Raça buscada: ${breedName}\n` +
        `URL recebida: ${imageUrl}\n` +
        `Dica: Verifique se o nome da raça corresponde ao padrão da API`
      );
    }
  }

  private static getFileExtension(url: string): string | null {
    const match = url.match(/\.([a-zA-Z0-9]+)$/);
    return match ? match[1].toLowerCase() : null;
  }
}
