
import { Product, User } from '../types';

// High-fidelity MongoDB simulation for static environments
class MongoMock {
  private storageKey = 'fabrima_db_';

  private async delay(ms: number = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Collection-based pattern simulation
  collection(name: string) {
    const key = this.storageKey + name;
    
    const getDocs = (): any[] => {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    };

    const saveDocs = (docs: any[]) => {
      localStorage.setItem(key, JSON.stringify(docs));
    };

    return {
      find: async (query: any = {}) => {
        await this.delay(300);
        const docs = getDocs();
        // Simple filter simulation
        return docs.filter(doc => {
          return Object.entries(query).every(([k, v]) => doc[k] === v);
        });
      },
      
      insertOne: async (doc: any) => {
        await this.delay(600);
        const docs = getDocs();
        const newDoc = { ...doc, _id: Math.random().toString(36).substr(2, 9), createdAt: new Date() };
        docs.push(newDoc);
        saveDocs(docs);
        return { insertedId: newDoc._id };
      },

      countDocuments: async () => {
        await this.delay(200);
        return getDocs().length;
      }
    };
  }

  // Specialized Enterprise Stats API
  async getPartnerStats() {
    await this.delay(400);
    return {
      partners: 184,
      sla: "99.8%",
      dispatch: "24h",
      activeLoad: "84%"
    };
  }

  async verifyPartnerID(partnerId: string): Promise<boolean> {
    await this.delay(800);
    // Simulation logic: IDs must follow enterprise naming convention
    return partnerId.toUpperCase().startsWith('ZM-');
  }
}

export const db = new MongoMock();
