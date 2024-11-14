import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private token: string | null | undefined;

  private baseUrl = 'http://localhost:8081/api/users'; // Replace with your actual backend API URL

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  getUsersByStatus(status: string): Observable<any[]> {
    const url = `${this.baseUrl}/status/${status}`;
    return this.http.get<any[]>(url);
  }
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/${id}`);
  }
  approveUser(userId: number): Observable<any> {
    const url = `${this.baseUrl}/${userId}/approve`;
    return this.http.put(url, {}).pipe(
      tap(() => this.sharedService.announceApproval(userId))
    );
  }
  changeUserRole(userId: number, newRole: string): Observable<any> {
    const url = `${this.baseUrl}/${userId}/role`;
    const params = new HttpParams().set('role', newRole);
    return this.http.put(url, {}, { params });
  }

  signUp(user: any): Observable<string> {
    return this.http.post(`${this.baseUrl}/signup`, user, { responseType: 'text' });
}


  signIn(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signin`, user).pipe(
      tap((response: any) => {
        this.setToken(response.token); // Store the token received from the server
        localStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }
  deleteUser(userId: number): Observable<void> {
    const url = `${this.baseUrl}/${userId}`;
    return this.http.delete<void>(url);
  }
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  isLoggedIn() {
    return this.token != null;
  }

  signOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
  }
  
}
