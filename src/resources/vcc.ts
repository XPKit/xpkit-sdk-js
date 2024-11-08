import type { GetResourcesRequest, XPKitResources, XPKitResource, XPKitAcknowledgement, VccConfigurationRequest, VccTriggerTaskRequest, VccTriggerTaskGroupRequest } from '../types';
import { BaseResource } from './base';


export class Vcc extends BaseResource {

  /**
   * List configurations
   * @param {GetResourcesRequest} filterOptions - Filter options to apply.
   * @returns {Promise<XPKitResources>} - XPKit resources matching the filter options.
   *
   * @public
   */
  async listConfigurations(filterOptions: GetResourcesRequest = {}): Promise<XPKitResources> {
    const url = `https://vcc.${this.baseUrl}/api/configuration`;
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
    const url = `https://vcc.${this.baseUrl}/api/configuration/${resourceId}`;
    this.logger.log(`Calling readConfiguration at ${url}`);
    return await this.api.callResource(url, 'GET');
  }

  /**
   * Create configuration
   * @param {VccConfigurationRequest} resource - The configuration to create.
   * @returns {Promise<XPKitResource>} - The created XPKit resource.
   *
   * @public
   */
  async createConfiguration(resource: VccConfigurationRequest): Promise<XPKitResource> {
    const url = `https://vcc.${this.baseUrl}/api/configuration`;
    this.logger.log(`Calling createConfiguration at ${url}`);
    return await this.api.callResource(url, 'POST', resource);
  }

  /**
   * Replace configuration
   * @param {string} resourceId - The ID of the configuration to replace.
   * @param {VccConfigurationRequest} resource - The new configuration data.
   * @returns {Promise<XPKitResource>} - The replaced XPKit resource.
   *
   * @public
   */
  async replaceConfiguration(resourceId: string, resource: VccConfigurationRequest): Promise<XPKitResource> {
    const url = `https://vcc.${this.baseUrl}/api/configuration/${resourceId}`;
    this.logger.log(`Calling replaceConfiguration at ${url}`);
    return await this.api.callResource(url, 'PUT', resource);
  }

  /**
   * Delete configuration
   * @param {string} resourceId - The ID of the configuration to delete.
   * @returns {Promise<boolean>} - True if the configuration was deleted.
   *
   * @public
   */
  async deleteConfiguration(resourceId: string): Promise<boolean> {
    const url = `https://vcc.${this.baseUrl}/api/configuration/${resourceId}`;
    this.logger.log(`Calling deleteConfiguration at ${url}`);
    return await this.api.deleteResource(url);
  }

  /**
   * Upload asset
   * @param {File} asset - The asset to upload.
   * @returns {Promise<boolean>} - True if the asset was uploaded.
   *
   * @public
   */
  async uploadAsset(asset: File): Promise<boolean> {
    const url = `https://vcc.${this.baseUrl}/api/asset`;
    this.logger.log(`Calling uploadAsset at ${url}`);
    await this.api.uploadMultipart(url, {'asset': asset}) as XPKitResource;
    return true;
  }

  /**
   * Trigger task
   * @param {VccTriggerTaskRequest} resource - The options required to trigger a task.
   * @returns {Promise<XPKitAcknowledgement>} - An XPKit acknowledgement.
   *
   * @public
   */
  async triggerTask(resource: VccTriggerTaskRequest): Promise<XPKitAcknowledgement> {
    const url = `https://vcc.${this.baseUrl}/api/task`;
    this.logger.log(`Calling triggerTask at ${url}`);
    return await this.api.uploadMultipart(url, resource) as XPKitAcknowledgement;
  }

  /**
   * Trigger task group
   * @param {VccTriggerTaskGroupRequest} resource - The options required to trigger a task group.
   * @returns {Promise<XPKitAcknowledgement>} - An XPKit acknowledgement.
   *
   * @public
   */
  async triggerTaskGroup(resource: VccTriggerTaskGroupRequest): Promise<XPKitAcknowledgement> {
    const url = `https://vcc.${this.baseUrl}/api/taskgroup`;
    this.logger.log(`Calling triggerTaskGroup at ${url}`);
    return await this.api.uploadMultipart(url, resource) as XPKitAcknowledgement;
  }

  /**
   * List tasks
   * @param {GetResourcesRequest} filterOptions - Filter options to apply.
   * @returns {Promise<XPKitResources>} - XPKit resources matching the filter options.
   *
   * @public
   */
  async listTasks(filterOptions: GetResourcesRequest = {}): Promise<XPKitResources> {
    const url = `https://vcc.${this.baseUrl}/api/meta/task`;
    this.logger.log(`Calling listTasks at ${url}`);
    return await this.api.getResources(url, filterOptions);
  }

  /**
   * Read task
   * @param {string} resourceId - The ID of the task to fetch.
   * @returns {Promise<XPKitResource>} - XPKit resource matching the resourceId.
   *
   * @public
   */
  async readTask(resourceId: string): Promise<XPKitResource> {
    const url = `https://vcc.${this.baseUrl}/api/meta/task/${resourceId}`;
    this.logger.log(`Calling readTask at ${url}`);
    return await this.api.callResource(url, 'GET');
  }

  /**
   * Retrigger task
   * @param {string} resourceId - The ID of the task to retrigger.
   * @returns {Promise<XPKitResource>} - The retriggered task.
   *
   * @public
   */
  async retriggerTask(resourceId: string): Promise<XPKitResource> {
    const url = `https://vcc.${this.baseUrl}/api/meta/task/${resourceId}`;
    this.logger.log(`Calling retriggerTask at ${url}`);
    return await this.api.callResource(url, 'POST', {});
  }

  /**
   * Cancel task
   * @param {string} resourceId - The ID of the task to cancel.
   * @returns {Promise<XPKitResource>} - The cancelled task.
   *
   * @public
   */
  async cancelTask(resourceId: string): Promise<XPKitResource> {
    const url = `https://vcc.${this.baseUrl}/api/meta/task/${resourceId}`;
    this.logger.log(`Calling cancelTask at ${url}`);
    return await this.api.callResource(url, 'PATCH', {});
  }

  /**
   * Retrigger tasks
   * @param {string[]} resourceIds - The IDs of the tasks to retrigger.
   * @returns {Promise<XPKitResource>} - The retriggered tasks.
   *
   * @public
   */
  async retriggerTasks(resourceIds: string[]): Promise<XPKitResource> {
    const url = `https://vcc.${this.baseUrl}/api/meta/tasks`;
    this.logger.log(`Calling retriggerTask at ${url}`);
    return await this.api.callResource(url, 'POST', {'tasks_ids': resourceIds});
  }

}