import type { XPKitResource, UserUpdateRequest, UserInviteRequest } from '../types';
import { BaseResource } from './base';


export class Users extends BaseResource {

  /**
   * Read user
   * @returns {Promise<XPKitResource>} - XPKit resource representing the user.
   *
   * @remarks
   * An access token from a logged in user is required to use this method.
   *
   * @public
   */
  async readUser(): Promise<XPKitResource> {
    const url = `https://auth.${this.baseUrl}/api/user/me`;
    this.logger.log(`Calling readUser at ${url}`);
    return await this.api.callResource(url, 'GET');
  }

  /**
   * Update user
   * @param {UserUpdateRequest} resource - The user to update.
   * @returns {Promise<XPKitResource>} - The updated XPKit resource.
   *
   * @remarks
   * An access token from a logged in user is required to use this method.
   *
   * @public
   */
  async updateUser(resource: UserUpdateRequest): Promise<XPKitResource> {
    const url = `https://auth.${this.baseUrl}/api/user/me`;
    this.logger.log(`Calling updateUser at ${url}`);
    return await this.api.callResource(url, 'PATCH', resource);
  }

  /**
   * Invite user to account
   * @param {UserInviteRequest} resource - The user to invite.
   * @returns {Promise<XPKitResource>} - The created XPKit resource.
   *
   * @public
   */
  async inviteUserToAccount(resource: UserInviteRequest): Promise<XPKitResource> {
    const url = `https://auth.${this.baseUrl}/api/invite`;
    this.logger.log(`Calling inviteUserToAccount at ${url}`);
    return await this.api.callResource(url, 'POST', resource);
  }

}