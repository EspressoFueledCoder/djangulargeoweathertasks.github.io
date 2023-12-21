/*
    api/api.service.ts

    @Injectable service to make api calls and retrieve/post data to the backend

    Author information is provided for reference.
    Donato Cappiello (dino.cappiello@gmail.com)
*/


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Task, Server } from '@interfaces/models';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root' // Specifies that this service should be created by the root application injector.
})
export class ApiService {
  API_URL = environment.apiUrl;

  // Define the base URL for the API endpoints.
  URL = 'http://localhost/api';

  // Inject the HttpClient into this service.
  constructor(private http: HttpClient) { }

  // Get a list of tasks
  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.URL}/task/`);
  }

  // Update a Task.
  public putTask(task: Task) {
    return this.http.put(`${this.URL}/task/${task.id}/`,task);
  }

  // Delete a Task.
  public deleteTask(task_id: number) {
    return this.http.delete(`${this.URL}/task/${task_id}/`);
  }

  // Create a Task.
  public postTask(new_task: Task) {
    return this.http.post(`${this.URL}/task/`,new_task);
  }


  // Get a list of servers
  public getServers(): Observable<Server[]> {
    return this.http.get<Server[]>(`${this.URL}/server/`);
  }

  // Update a Server.
  public putServer(server: Server) {
    console.log(server);
    return this.http.put(`${this.URL}/server/${server.id}/`,server);
  }

  // Delete a Server.
  public deleteServer(server_id: number) {
    return this.http.delete(`${this.URL}/server/${server_id}/`);
  }

  // Create a Server.
  public postServer(new_server: Server) {
    return this.http.post(`${this.URL}/server/`,new_server);
  }
}

