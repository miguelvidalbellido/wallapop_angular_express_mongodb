import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User, UserProfile } from '../models';
import { map ,  distinctUntilChanged } from 'rxjs/operators';
import { ApiSecureService } from './api_secure.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private currentUserSubject = new BehaviorSubject<User>({} as User);
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
  
    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  
    constructor (
      private apiService: ApiService,
      private jwtService: JwtService
    ) {}
  
    // Verify JWT in localstorage with server & load user's info.
    // This runs once on application startup.
    populate() {
      // If JWT detected, attempt to get & store user's info
      const token = this.jwtService.getToken();
      if (token) {
        this.apiService.get("/api/users/dataUser").subscribe(
          (data) => {
            return this.setAuth({ ...data.user, token });
          },
          (err) => this.purgeAuth()
        );
      } else {
        // Remove any potential remnants of previous auth states
        this.purgeAuth();
      }
    }
  
    setAuth(user: User) {
      // Save JWT sent from server in localstorage
      this.jwtService.saveToken(user.token);
      // Set current user data into observable
      this.currentUserSubject.next(user);
      // Set isAuthenticated to true
      this.isAuthenticatedSubject.next(true);
    }
  
    purgeAuth() {
      // Remove JWT from localstorage
      this.jwtService.destroyToken();
      // Set current user to an empty object
      this.currentUserSubject.next({} as User);
      // Set auth status to false
      this.isAuthenticatedSubject.next(false);
    }
  
    attemptAuth(type: any, credentials: any): Observable<User> {
      const route = (type === 'login') ? '/login' : '';
      return this.apiService.post(`/api/users${route}`, {user: credentials})
        .pipe(map(
        data => {
          this.setAuth(data.user);
          return data;
        }
      ));
    }
  
    getCurrentUser(): User {
      return this.currentUserSubject.value;
    }
  
    // Update the user on the server (email, pass, etc)
    update(user: User): Observable<User> {
      return this.apiService
      .put(`/api/users`, {user} )
      .pipe(map(data => {
        // Update the currentUser observable
        this.currentUserSubject.next(data.user);
        return data.user;
      }));
    }

    follow(username: String): Observable<any> {
      return this.apiService
      .put(`/api/users/follow`, {username} )
      .pipe(map(data => {        
        return data.response;
      }));
    }

    getDataUserProfile(username?: String): Observable<UserProfile> {
      return this.apiService.get('/api/users/profileData/'+username)
      .pipe(map(data => data.user))
    }

    checkIfUserLoggedIsFollowing(username?: String) {
      return this.apiService.get('/api/users/userIsFollowByCurrentUser/'+username)
      .pipe(map(data => data.isFollowing))
    }

    checkUsersFollowed() {
      return this.apiService.get('/api/users/usersFollowed/')
      .pipe(map(data => data.users))
    }

    getProfileStats() {
      return this.apiService.get('/api/users/userProfileStats/')
      .pipe(map(data => data.stats))
    }
  
    
  }