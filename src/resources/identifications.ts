import type { IdentificationOptions, IdentificationTypeOptions, GetResourcesRequest, XPKitResources, XPKitAcknowledgement, XPKitResource, IdentificationGenerateWalletRequest, IdentificationsBatchRequest } from '../types';
import { BaseResource } from './base';
import { XPKitError } from '../errors';

export class Identifications extends BaseResource {

  /**
   * Create an identity
   * @param {IdentificationTypeOptions} identityType - Either qrcode or pdf417
   * @param {string} accountId - The account ID
   * @param {IdentificationOptions} options - The options to create the identity including the format
   * @returns {Promise<string | Blob>} - The created identity as a string or a blob (png)
   *
   * @public
   */
  async createIdentity(identityType: IdentificationTypeOptions, accountId: string, options: IdentificationOptions): Promise<string | Blob> {
    const url = `https://identifications.${this.baseUrl}/api/identity/${identityType}`;
    const additionalHeaders = {'Account-ID': accountId};
    const fileType = options.format || 'text';
    this.logger.log(`Calling createIdentity at ${url}`);
    return await this.api.downloadResource(url, 'GET', {}, options, additionalHeaders, fileType);
  }

  /**
   * Generate a PNG from the data
   * @param {IdentificationTypeOptions} identityType - Either qrcode or pdf417
   * @param {string} accountId - The account ID
   * @param {string} data - The data to encode
   * @param {IdentificationOptions} options - The options to encode the identity
   * @returns {Promise<Blob>} - The encoded identity as a blob (png)
   *
   * @public
   */
  async encodeIdentity(identityType: IdentificationTypeOptions, accountId: string, data: string, options: IdentificationOptions): Promise<Blob> {
    const url = `https://identifications.${this.baseUrl}/api/identity/encode/${identityType}`;
    const additionalHeaders = {'Account-ID': accountId};
    const fileType = 'png';
    options.data = data;
    this.logger.log(`Calling encodeIdentity at ${url}`);
    return await this.api.downloadResource(url, 'GET', {}, options, additionalHeaders, fileType) as Blob;
  }

  /**
   * Check if the identity already exists
   * @param {string} accountId - The account ID
   * @param {string} data - The data to decode
   * @returns {Promise<boolean>} - Whether the identity exists
   *
   * @public
   */
  async verifyIdentity(accountId: string, data: string): Promise<boolean> {
    const url = `https://identifications.${this.baseUrl}/api/identity/verify`;
    const additionalHeaders = {'Account-ID': accountId};
    this.logger.log(`Calling verifyIdentity at ${url}`);
    try {
      await this.api.downloadResource(url, 'GET', {}, {'data': data}, additionalHeaders, 'text/text');
      return true;
    } catch (error) {
      if (error instanceof XPKitError) {
        if (error.code === 404) {
          return false;
        }
      }
      throw error;
    }
  }

  /**
   * List all the created batches of identities
   * @param {GetResourcesRequest} filterOptions - Filter options to apply
   * @returns {Promise<XPKitResources>} - Batches of identities matching the filter options
   *
   * @public
   */
  async listBatches(filterOptions: GetResourcesRequest = {}): Promise<XPKitResources> {
    const url = `https://identifications.${this.baseUrl}/api/identity/download`;
    this.logger.log(`Calling listBatches at ${url}`);
    return await this.api.getResources(url, filterOptions);
  }

  /**
   * Create a batch of identities
   * @param {IdentificationTypeOptions} identityType - Either qrcode or pdf417
   * @param {IdentificationsBatchRequest} resource - The options to create the batch of identities
   * @returns {Promise<XPKitAcknowledgement>} - An acknowledgement of the batch request
   *
   * @public
   */
  async createBatch(identityType: IdentificationTypeOptions, resource: IdentificationsBatchRequest): Promise<XPKitAcknowledgement> {
    const url = `https://identifications.${this.baseUrl}/api/identity/batch/${identityType}`;
    this.logger.log(`Calling createBatch at ${url}`);
    return await this.api.callAsyncRequest(url, 'POST', resource);
  }

  /**
   * Download a batch of identities
   * @param {string} resourceId - The ID of the batch to download
   * @returns {Promise<Blob>} - The batch of identities as a zip file
   *
   * @public
   */
  async downloadBatch(resourceId: string): Promise<Blob> {
    const url = `https://identifications.${this.baseUrl}/api/identity/download/${resourceId}`;
    this.logger.log(`Calling downloadBatch at ${url}`);
    return await this.api.downloadResource(url, 'GET', {}, {}, {}, 'zip') as Blob;
  }

  /**
   * Delete a batch of identities
   * @param {IdentificationTypeOptions} identityType - Either qrcode or pdf417
   * @param {string} resourceId - The ID of the batch to delete
   * @returns {Promise<boolean>} - True if the batch was deleted
   *
   * @public
   */
  async deleteBatch(identityType: IdentificationTypeOptions, resourceId: string): Promise<boolean> {
    const url = `https://identifications.${this.baseUrl}/api/identity/batch/${identityType}`;
    this.logger.log(`Calling deleteBatch at ${url}`);
    try {
      return await this.api.deleteResource(url, {'batch_id': resourceId});
    } catch (error) {
      if (error instanceof XPKitError) {
        if (error.code === 200) {
          return true;
        }
      }
      throw error;
    }
  }

  /**
   * List all the Apple wallet configurations
   * @param {GetResourcesRequest} filterOptions - Filter options to apply
   * @returns {Promise<XPKitResources>} - Configurations matching the filter options
   *
   * @public
   */
  async listWalletConfigurations(filterOptions: GetResourcesRequest = {}): Promise<XPKitResources> {
    const url = `https://identifications.${this.baseUrl}/api/identity/apple`;
    this.logger.log(`Calling listWalletConfigurations at ${url}`);
    return await this.api.getResources(url, filterOptions);
  }

  /**
   * Read an Apple wallet configuration
   * @param {string} resourceId - The ID of the wallet configuration to fetch
   * @returns {Promise<XPKitResource>} - Configuration matching the resourceId
   *
   * @public
   */
  async readWalletConfiguration(resourceId: string): Promise<XPKitResource> {
    const url = `https://identifications.${this.baseUrl}/api/identity/apple/${resourceId}`;
    this.logger.log(`Calling readWalletConfiguration at ${url}`);
    return await this.api.callResource(url, 'GET');
  }

  /**
   * Create an Apple wallet configuration
   * @param {string} configurationName - The name of the configuration to create
   * @returns {Promise<XPKitResource>} - The created configuration
   *
   * @public
   */
  async createWalletConfiguration(configurationName: string): Promise<XPKitResource> {
    const url = `https://identifications.${this.baseUrl}/api/identity/apple`;
    this.logger.log(`Calling createWalletConfiguration at ${url}`);
    return await this.api.callResource(url, 'POST', {'configuration_name': configurationName});
  }

  /**
   * Upload a file to an Apple wallet configuration
   * @param {string} resourceId - The ID of the wallet configuration to upload the file to
   * @param {string} fileKey - The key of the file to upload
   * @param {File} file - The file to upload
   * @returns {Promise<XPKitResource>} - The updated configuration
   *
   * @public
   */
  async uploadWalletConfigurationFile(resourceId: string, fileKey: string, file: File): Promise<XPKitResource> {
    const url = `https://identifications.${this.baseUrl}/api/identity/apple/${resourceId}`;
    this.logger.log(`Calling uploadWalletConfigurationFile at ${url}`);
    return await this.api.uploadMultipart(url, {[fileKey]: file}) as XPKitResource;
  }

  /**
   * Update a field in an Apple wallet configuration
   * @param {string} resourceId - The ID of the wallet configuration to update
   * @param {string} field - The field to update
   * @param {string} value - The value to update
   * @returns {Promise<XPKitResource>} - The updated configuration
   *
   * @public
   */
  async updateWalletConfiguration(resourceId: string, field: string, value: string): Promise<XPKitResource> {
    const url = `https://identifications.${this.baseUrl}/api/identity/apple/${resourceId}`;
    this.logger.log(`Calling updateWalletConfiguration at ${url}`);
    return await this.api.callResource(url, 'PATCH', {[field]: value});
  }

  /**
   * Delete an Apple wallet configuration
   * @param {string} resourceId - The ID of the wallet configuration to delete
   * @returns {Promise<boolean>} - True if the configuration was deleted
   *
   * @public
   */
  async deleteWalletConfiguration(resourceId: string): Promise<boolean> {
    const url = `https://identifications.${this.baseUrl}/api/identity/apple/${resourceId}`;
    this.logger.log(`Calling deleteWalletConfiguration at ${url}`);
    return await this.api.deleteResource(url);
  }

  /**
   * Generate a wallet pass file
   * @param {IdentificationGenerateWalletRequest} resource - The request options to generate the wallet pass file
   * @returns {Promise<XPKitResource>} - The generated wallet pass file
   *
   * @public
   */
  async generateWalletPassFile(resource: IdentificationGenerateWalletRequest): Promise<XPKitResource> {
    const url = `https://identifications.${this.baseUrl}/api/identity/apple/wallet`;
    this.logger.log(`Calling generateWalletPassFile at ${url}`);
    return await this.api.callResource(url, 'POST', resource,);
  }
}