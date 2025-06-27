import { apiClient } from '../api/apiClient';
import { SOCIAL_ENDPOINTS } from '../api/config';
export interface SocialAccount {
  id: string;
  platform: string;
  username: string;
  profileImage?: string;
  connected: boolean;
  lastSync?: string;
  stats?: {
    followers: number;
    following: number;
    posts: number;
  };
}
export interface ScheduledPost {
  id: string;
  content: string;
  mediaUrls?: string[];
  platforms: string[];
  scheduledDate: string;
  status: 'scheduled' | 'published' | 'failed';
  error?: string;
}
/**
 * Social media service for handling social accounts
 */
export const socialService = {
  /**
   * Get list of connected social accounts
   */
  async getSocialAccounts(): Promise<SocialAccount[]> {
    try {
      return await apiClient.get(SOCIAL_ENDPOINTS.LIST_ACCOUNTS);
    } catch (error) {
      console.error('Get social accounts error:', error);
      throw error;
    }
  },
  /**
   * Connect a new social account
   */
  async connectAccount(platform: string, authData: any): Promise<SocialAccount> {
    try {
      return await apiClient.post(SOCIAL_ENDPOINTS.CONNECT_ACCOUNT, {
        platform,
        ...authData
      });
    } catch (error) {
      console.error('Connect account error:', error);
      throw error;
    }
  },
  /**
   * Disconnect a social account
   */
  async disconnectAccount(id: string): Promise<void> {
    try {
      const url = SOCIAL_ENDPOINTS.DISCONNECT_ACCOUNT.replace(':id', id);
      await apiClient.post(url, {});
    } catch (error) {
      console.error('Disconnect account error:', error);
      throw error;
    }
  },
  /**
   * Get account details
   */
  async getAccountDetails(id: string): Promise<SocialAccount> {
    try {
      const url = SOCIAL_ENDPOINTS.GET_ACCOUNT_DETAILS.replace(':id', id);
      return await apiClient.get(url);
    } catch (error) {
      console.error('Get account details error:', error);
      throw error;
    }
  },
  /**
   * Publish content to social platforms
   */
  async publishContent(content: string, mediaIds: string[], platforms: string[]): Promise<any> {
    try {
      return await apiClient.post(SOCIAL_ENDPOINTS.PUBLISH_CONTENT, {
        content,
        mediaIds,
        platforms
      });
    } catch (error) {
      console.error('Publish content error:', error);
      throw error;
    }
  },
  /**
   * Schedule content for later publishing
   */
  async scheduleContent(content: string, mediaIds: string[], platforms: string[], scheduledDate: string): Promise<ScheduledPost> {
    try {
      return await apiClient.post(SOCIAL_ENDPOINTS.PUBLISH_CONTENT, {
        content,
        mediaIds,
        platforms,
        scheduledDate
      });
    } catch (error) {
      console.error('Schedule content error:', error);
      throw error;
    }
  },
  /**
   * Get scheduled posts
   */
  async getScheduledPosts(): Promise<ScheduledPost[]> {
    try {
      return await apiClient.get(SOCIAL_ENDPOINTS.SCHEDULED_POSTS);
    } catch (error) {
      console.error('Get scheduled posts error:', error);
      throw error;
    }
  }
};