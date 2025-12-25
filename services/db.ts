
import { Product, User } from '../types';

// Mocking MongoDB-like asynchronous behavior
class StorageDB {
  private PRODUCTS_KEY = 'fabrima_products';
  private USERS_KEY = 'fabrima_users';
  private VENDORS_KEY = 'fabrima_vendors';
  private PARTNERS_KEY = 'fabrima_partners';

  constructor() {
    this.init();
  }

  private init() {
    if (!localStorage.getItem(this.PRODUCTS_KEY)) {
      localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify([]));
    }
  }

  // Simulate MongoDB Find
  async getUsers(): Promise<User[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = localStorage.getItem(this.USERS_KEY);
        resolve(data ? JSON.parse(data) : []);
      }, 300);
    });
  }

  // Simulate MongoDB InsertOne
  async saveUser(user: Partial<User>): Promise<boolean> {
    return new Promise(async (resolve) => {
      const users = await this.getUsers();
      users.push({ ...user, id: Math.random().toString(36).substr(2, 9) } as User);
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
      setTimeout(() => resolve(true), 500);
    });
  }

  // Partner specific queries
  async getPartnerStats(): Promise<{ partners: number; sla: string; dispatch: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          partners: 184,
          sla: "99.8%",
          dispatch: "24h"
        });
      }, 400);
    });
  }

  async verifyPartnerID(partnerId: string): Promise<boolean> {
    // Simulation of ID check against a MongoDB collection
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(partnerId.startsWith('ZM-'));
      }, 800);
    });
  }
}

export const db = new StorageDB();
