import type { GetResourcesRequest, XPKitResources, XPKitResource, XPKitAcknowledgement, NftConfigurationRequest, NftMintRequest } from '../types';
import { BaseResource } from './base';


export class Nfts extends BaseResource {

  /**
   * List configurations
   * @param {GetResourcesRequest} filterOptions - Filter options to apply.
   * @returns {Promise<XPKitResources>} - XPKit resources matching the filter options.
   *
   * @public
   */
  async listConfigurations(filterOptions: GetResourcesRequest = {}): Promise<XPKitResources> {
    const url = `https://nfts.${this.baseUrl}/api/configuration`;
    this.logger.log(`Calling listConfigurations at ${url}`);
    return await this.api.getResources(url, filterOptions);
  }

  /**
   * Read configuration
   * @param {string} resourceId - The ID of the configuration to fetch.
   * @returns {Promise<XPKitResource>} - XPKit resource matching the resourceId.
   *
   * @public
   */
  async readConfiguration(resourceId: string): Promise<XPKitResource> {
    const url = `https://nfts.${this.baseUrl}/api/configuration/${resourceId}`;
    this.logger.log(`Calling readConfiguration at ${url}`);
    return await this.api.callResource(url, 'GET');
  }

  /**
   * Create configuration
   * @param {NftConfigurationRequest} resource - The configuration to create.
   * @returns {Promise<XPKitResource>} - The created XPKit resource.
   *
   * @public
   */
  async createConfiguration(resource: NftConfigurationRequest): Promise<XPKitResource> {
    const url = `https://nfts.${this.baseUrl}/api/configuration`;
    this.logger.log(`Calling createConfiguration at ${url}`);
    return await this.api.callResource(url, 'POST', resource);
  }

  /**
   * Replace configuration
   * @param {string} resourceId - The ID of the configuration to replace.
   * @param {NftConfigurationRequest} resource - The new configuration data.
   * @returns {Promise<XPKitResource>} - The replaced XPKit resource.
   *
   * @public
   */
  async replaceConfiguration(resourceId: string, resource: NftConfigurationRequest): Promise<XPKitResource> {
    const url = `https://nfts.${this.baseUrl}/api/configuration/${resourceId}`;
    this.logger.log(`Calling replaceConfiguration at ${url}`);
    return await this.api.callResource(url, 'PUT', resource);
  }

  /**
   * Delete configuration
   * @param {string} resourceId - The ID of the configuration to delete.
   * @returns {Promise<boolean>} - Whether the configuration was deleted.
   *
   * @public
   */
  async deleteConfiguration(resourceId: string): Promise<boolean> {
    const url = `https://nfts.${this.baseUrl}/api/configuration/${resourceId}`;
    this.logger.log(`Calling deleteConfiguration at ${url}`);
    return await this.api.deleteResource(url);
  }

  /**
   * Mint an NFT
   * @param {NftMintRequest} resource - The NFT and options required to mint.
   * @returns {Promise<XPKitAcknowledgement>} - Acknowledgement of the mint request.
   *
   * @public
   */
  async mintNft(resource: NftMintRequest): Promise<XPKitAcknowledgement> {
    const url = `https://nfts.${this.baseUrl}/api/nft/mint`;
    this.logger.log(`Calling mintNft at ${url}`);
    return await this.api.uploadMultipart(url, resource) as XPKitAcknowledgement;
  }
}