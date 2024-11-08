import type { GetQueryableResourcesRequest, ProfilesMergeRequest, ProfilesBulkRequest, XPKitResources, XPKitResource, XPKitAcknowledgement, XPKitRequest } from '../types';
import { BaseResource } from './base';


export class Profiles extends BaseResource {

  /**
   * List profiles
   * @param {GetQueryableResourcesRequest} filterOptions - Filter options to apply.
   * @returns {Promise<XPKitResources>} - XPKit resources matching the filter options.
   *
   * @public
   */
  async listProfiles(filterOptions: GetQueryableResourcesRequest = {}): Promise<XPKitResources> {
    const url = `https://profiles.${this.baseUrl}/api/profile`;
    this.logger.log(`Calling listProfiles at ${url}`);
    return await this.api.getResources(url, filterOptions);
  }

  /**
   * Read profile
   * @param {string} resourceId - The ID of the profile to fetch.
   * @returns {Promise<XPKitResource>} - XPKit resource matching the resourceId.
   *
   * @public
   */
  async readProfile(resourceId: string): Promise<XPKitResource> {
    const url = `https://profiles.${this.baseUrl}/api/profile/${resourceId}`;
    this.logger.log(`Calling readProfile at ${url}`);
    return await this.api.callResource(url, 'GET');
  }

  /**
   * Create profile
   * @param {XPKitRequest} resource - The profile to create.
   * @returns {Promise<XPKitResource>} - The created XPKit resource.
   *
   * @public
   */
  async createProfile(resource: XPKitRequest): Promise<XPKitResource> {
    const url = `https://profiles.${this.baseUrl}/api/profile`;
    this.logger.log(`Calling createProfile at ${url}`);
    return await this.api.callResource(url, 'POST', resource);
  }

  /**
   * Replace profile
   * @param {string} resourceId - The ID of the profile to replace
   * @param {XPKitRequest} resource - The profile to save
   * @returns {XPKitResource} - The updated XPKit resource
   *
   * @public
   */
  async replaceProfile(resourceId: string, resource: XPKitRequest): Promise<XPKitResource> {
    const url = `https://profiles.${this.baseUrl}/api/profile/${resourceId}`;
    this.logger.log(`Calling replaceProfile at ${url}`);
    return await this.api.callResource(url, 'PUT', resource);
  }

  /**
   * Update profile
   * @param {string} resourceId - the ID of the profile to update
   * @param {XPKitRequest} resource - the profile to save
   * @returns {XPKitResource} - the updated XPKit resource
   *
   * @public
   */
  async updateProfile(resourceId: string, resource: XPKitRequest): Promise<XPKitResource> {
    const url = `https://profiles.${this.baseUrl}/api/profile/${resourceId}`;
    this.logger.log(`Calling updateProfile at ${url}`);
    return await this.api.callResource(url, 'PATCH', resource);
  }

  /**
   * Delete profile
   * @param {string} resourceId - The ID of the profile to delete.
   * @returns {Promise<boolean>} - True if the profile was deleted.
   *
   * @public
   */
  async deleteProfile(resourceId: string): Promise<boolean> {
    const url = `https://profiles.${this.baseUrl}/api/profile/${resourceId}`;
    this.logger.log(`Calling deleteProfile at ${url}`);
    return await this.api.deleteResource(url);
  }

  /**
   * Create or update a profile
   * @param {XPKitRequest} resource - The profile to create or update.
   * @returns {Promise<XPKitResource>} - The created or updated XPKit resource.
   *
   * @public
   */
  async createOrUpdateProfile(resource: XPKitRequest): Promise<XPKitResource> {
    const url = `https://profiles.${this.baseUrl}/api/profile/create-update`;
    this.logger.log(`Calling createOrUpdateProfile at ${url}`);
    return await this.api.callResource(url, 'POST', resource);
  }

  /**
   * Merge two or more profiles
   * @param {ProfilesMergeRequest} resource - The resource IDs of the profiles to merge.
   * @returns {Promise<XPKitAcknowledgement>} - Acknowledgement of the merge request.
   *
   * @public
   */
  async mergeProfiles(resource: ProfilesMergeRequest): Promise<XPKitAcknowledgement> {
    const url = `https://profiles.${this.baseUrl}/api/profile/merge`;
    this.logger.log(`Calling mergeProfiles at ${url}`);
    return await this.api.callAsyncRequest(url, 'POST', resource);
  }

  /**
   * Create multiple profiles
   * @param {ProfilesBulkRequest} resource - The profiles to create.
   * @returns {Promise<XPKitAcknowledgement>} - Acknowledgement of the bulk request.
   *
   * @public
   */
  async createBulkProfiles(resource: ProfilesBulkRequest): Promise<XPKitAcknowledgement> {
    const url = `https://profiles.${this.baseUrl}/api/profiles`;
    this.logger.log(`Calling createBulkProfiles at ${url}`);
    return await this.api.callAsyncRequest(url, 'POST', resource);
  }

}