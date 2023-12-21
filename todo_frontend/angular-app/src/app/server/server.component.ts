/*
    server-list.compnent.ts

    Class that defines the class ServerListComponent 

    Author information is provided for reference.
    Donato Cappiello (dino.cappiello@gmail.com)
*/


import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@api/api.service';
import { ConfirmationService } from 'primeng/api';

import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { Server, LocationObject } from '@interfaces/models';

@Component({
  selector: 'app-server-list',                     
  templateUrl: './server.component.html',    
  providers: [MessageService],                 
  styleUrls: ['./server.component.css'] 
})

export class ServerListComponent implements OnInit {
  // Initialize an empty server object as a baseline structure for servers
  empty_server: Server = {
    id: undefined,        
    title: '',           
    description: '',     
    location: '',        
    temperature: undefined,
    is_done: false       
  };

  // Reactive property for binding and handling the single selected or edited server
  server: Server = this.empty_server;

  // Array to hold all servers displayed in the server list
  servers: Server[] = [];

  // Object to keep track of cloned servers for editing the rows in the UI
  clonedServers: { [s: string]: Server; } = {};

  // Arrays to store location objects and their details for selecting location in the UI
  locationsObjects: any[] = [];
  locations: any[] = [];

  // Object to bind and handle the selected location in the server form
  selectedLocation = { capital: '', name: '', code: '' };

  // Array of status options for the server status dropdown
  statuses: SelectItem[] = [];

  // Boolean value to control the visibility of the server dialog (modal)
  serverDialog: boolean = false;

  // Boolean flag to keep track of form submission state
  submitted: boolean = false;

  // Constructor with dependency injection for various services used within the component
  constructor(
    private apiService: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  
  ngOnInit() {
    // Retrieve the initial list of servers via the ApiService
    this.getList();

    // Fetch country locations using the LocationService and process the response
    this.locationService.getAllCountries().subscribe(
      (data: any[]) => {
        // Mapping received location data into a usable structure for the UI
        this.locationsObjects = data.map((location) => ({
          alpha2Code: location.alpha2Code,
          capital: location.capital,
        }));

        // Concatenate location names and codes for better visualization and sort them
        this.locations = this.concatenateLocationDetails(this.locationsObjects).sort();
      },
      (error: any) => {
        // Error handler for failed location fetch operation
        console.error('Error fetching countries', error);
      }
    );

    // Initializing available statuses for binding to a server status dropdown
    this.statuses = [{ label: 'true', value: 'true' }, { label: 'false', value: 'false' }]
  }

  // Method to concatenate location details for display purposes
  concatenateLocationDetails(locations: LocationObject[]): string[] {
    return locations.map(location => location.capital + ', ' + location.alpha2Code);
  }

  // Method to retrieve servers using the ApiService and assign them to the local servers array
  getList() {
    this.apiService.getServers().subscribe(
      (response: Server[]) => {
        // Success handler: set the servers array and call method to process temperatures
        this.servers = response;
        this.processTemperatures(this.servers);
        // Display success message using PrimeNG's message service
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Success: Servers retrieved' });
      },
      (error: any) => {
        // Error handler: log the error and show error message to the user
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error: Servers not retrieved' });
      }
    );
  }

  // Method to process temperature data for each server using the WeatherService
  processTemperatures(servers: Server[]) {
    servers.forEach(server => {
      if (!server.is_done) {
        // Fetch weather data for incomplete servers only
        this.weatherService.getWeather(server.location).subscribe(
          (data: any) => {
            // Log weather data for debugging purposes
            console.log(data);
            // Update server temperature with weather data
            server.temperature = data.main.temp;
          }
        )
      }
    })
  }

  // Method to update a server using the ApiService and refreshing the server list upon success
  updateServer(server: Server) {
    this.apiService.putServer(server)
      .subscribe(
        (response: any) => {
          // Success handler: show success message and refresh server list
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Success: Server updated' });
          this.getList(); // Refresh the servers list
        },
        (error: any) => {
          // Error handler: show error message to the user
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error: Server not updated' });
        }
      );
  }

  // Method to delete a server based on its ID using the ApiService and refreshing the list upon success
  deleteServer(server_id: number) {
    this.apiService.deleteServer(server_id)
      .subscribe(
        (response: any) => {
          // Success handler: show success message and refresh server list
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Success: Server successfully deleted!' });
          this.getList();
        },
        (error: any) => {
          // Error handler: show error message to the user
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error: Failed to delete server. Please try again.' });
        }
      );
  }

  // Method to initiate creation of a new server by resetting the server model and opening the server dialog
  openNew() {
    this.server = this.empty_server;
    this.submitted = false;
    this.serverDialog = true;
  }

  // Handler for initializing row edit operation; resets a server's completion status
  onRowEditInit(server: Server) {
    server.is_done = false;
  }

  // Handler for saving edited server on row; triggers server update process
  onRowEditSave(server: Server) {
    this.updateServer(server);
  }

  // Handler for row edit cancel operation; no specific action taken in this stub
  onRowEditCancel(server: Server, index: number) {
    
  }

  // Handler for deleting a server on row deletion; calls deleteServer method with the provided index
  onRowDelete(server: Server, index: number) {
    this.deleteServer(index);
  }

  // Method to hide the server dialog and reset the submission flag
  hideDialog() {
    this.serverDialog = false;
    this.submitted = false;
  }

  // Method to create or add a new server using the ApiService and refresh the list upon success
  saveProduct() {
    // Create or add the server through the ApiService
    this.apiService.postServer(this.server)
      .subscribe(
        (response: any) => {
          // Handle the successful response here; show success message and refresh server list
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Success: Server successfully created!' });
          this.getList();
        },
        (error: any) => {
          // Handle the error response here; show error message to the user
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error: Failed to create server. Please try again.' });
        }
      );
  }

}
