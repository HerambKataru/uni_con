import { administrators, type Administrator, type InsertAdministrator } from "@shared/schema";

export interface IStorage {
  getAdministrators(): Promise<Administrator[]>;
  getAdministratorById(id: number): Promise<Administrator | undefined>;
  getAdministratorByEmail(email: string): Promise<Administrator | undefined>;
  createAdministrator(administrator: InsertAdministrator): Promise<Administrator>;
  updateAdministrator(id: number, administrator: Partial<InsertAdministrator>): Promise<Administrator | undefined>;
  deleteAdministrator(id: number): Promise<boolean>;
  searchAdministrators(query: string, department?: string, position?: string): Promise<Administrator[]>;
  bulkCreateAdministrators(administrators: InsertAdministrator[]): Promise<Administrator[]>;
}

export class MemStorage implements IStorage {
  private administrators: Map<number, Administrator>;
  private currentId: number;

  constructor() {
    this.administrators = new Map();
    this.currentId = 1;
  }

  async getAdministrators(): Promise<Administrator[]> {
    return Array.from(this.administrators.values());
  }

  async getAdministratorById(id: number): Promise<Administrator | undefined> {
    return this.administrators.get(id);
  }

  async getAdministratorByEmail(email: string): Promise<Administrator | undefined> {
    return Array.from(this.administrators.values()).find(
      (admin) => admin.email.toLowerCase() === email.toLowerCase(),
    );
  }

  async createAdministrator(insertAdmin: InsertAdministrator): Promise<Administrator> {
    const id = this.currentId++;
    const admin: Administrator = { ...insertAdmin, id };
    this.administrators.set(id, admin);
    return admin;
  }

  async updateAdministrator(id: number, administrator: Partial<InsertAdministrator>): Promise<Administrator | undefined> {
    const existingAdmin = this.administrators.get(id);
    if (!existingAdmin) {
      return undefined;
    }

    const updatedAdmin: Administrator = { ...existingAdmin, ...administrator };
    this.administrators.set(id, updatedAdmin);
    return updatedAdmin;
  }

  async deleteAdministrator(id: number): Promise<boolean> {
    return this.administrators.delete(id);
  }

  async searchAdministrators(query: string, department?: string, position?: string): Promise<Administrator[]> {
    const searchQuery = query.toLowerCase();
    let results = Array.from(this.administrators.values());

    if (query) {
      results = results.filter(
        (admin) =>
          admin.name.toLowerCase().includes(searchQuery) ||
          admin.designation.toLowerCase().includes(searchQuery) ||
          admin.department.toLowerCase().includes(searchQuery) ||
          admin.email.toLowerCase().includes(searchQuery),
      );
    }

    if (department) {
      results = results.filter((admin) => admin.department === department);
    }

    if (position) {
      // Check if the position appears in the designation field
      results = results.filter((admin) => 
        admin.designation.toLowerCase().includes(position.toLowerCase())
      );
    }

    return results;
  }

  async bulkCreateAdministrators(administrators: InsertAdministrator[]): Promise<Administrator[]> {
    const createdAdmins: Administrator[] = [];

    for (const admin of administrators) {
      const createdAdmin = await this.createAdministrator(admin);
      createdAdmins.push(createdAdmin);
    }

    return createdAdmins;
  }
}

export const storage = new MemStorage();
