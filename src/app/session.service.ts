import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly SESSION_KEY = 'SESSIONID';

  constructor() {
    this.initializeSession();
  }

  private initializeSession(): void {
    if (!this.getSessionId()) {
      this.setSessionId(this.generateSessionId());
    }
  }

  private generateSessionId(): string {
    return 'xxxxxxxxyxxxxxxxyxxxxxxxxyxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  getSessionId(): string | null {
    return localStorage.getItem(this.SESSION_KEY);
  }

  setSessionId(sessionId: string): void {
    localStorage.setItem(this.SESSION_KEY, sessionId);
  }
}
