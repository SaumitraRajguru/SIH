import { type User, type InsertUser, type Session, type LoginRequest, type VerifyRequest } from "@shared/schema";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserVerification(email: string, isVerified: string): Promise<void>;
  setVerificationCode(email: string, code: string): Promise<void>;
  
  // Session operations
  createSession(userId: string): Promise<Session>;
  getSessionByToken(token: string): Promise<Session | undefined>;
  deleteSession(token: string): Promise<void>;
  
  // Auth operations
  verifyPassword(email: string, password: string): Promise<User | null>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private sessions: Map<string, Session>;

  constructor() {
    this.users = new Map();
    this.sessions = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    const user: User = {
      ...insertUser,
      id,
      password: hashedPassword,
      isVerified: "false",
      verificationCode,
      createdAt: new Date(),
    };
    
    this.users.set(id, user);
    return user;
  }

  async updateUserVerification(email: string, isVerified: string): Promise<void> {
    const user = await this.getUserByEmail(email);
    if (user) {
      user.isVerified = isVerified;
      user.verificationCode = null;
      this.users.set(user.id, user);
    }
  }

  async setVerificationCode(email: string, code: string): Promise<void> {
    const user = await this.getUserByEmail(email);
    if (user) {
      user.verificationCode = code;
      this.users.set(user.id, user);
    }
  }

  async createSession(userId: string): Promise<Session> {
    const sessionId = randomUUID();
    const token = randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

    const session: Session = {
      id: sessionId,
      userId,
      token,
      expiresAt,
      createdAt: new Date(),
    };

    this.sessions.set(token, session);
    return session;
  }

  async getSessionByToken(token: string): Promise<Session | undefined> {
    const session = this.sessions.get(token);
    if (session && session.expiresAt > new Date()) {
      return session;
    }
    if (session) {
      this.sessions.delete(token);
    }
    return undefined;
  }

  async deleteSession(token: string): Promise<void> {
    this.sessions.delete(token);
  }

  async verifyPassword(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (!user) return null;
    
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }
}

export const storage = new MemStorage();
