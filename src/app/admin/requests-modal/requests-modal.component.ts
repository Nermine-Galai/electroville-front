import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../user-service.service';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-requests-modal',
  templateUrl: './requests-modal.component.html',
  styleUrls: ['./requests-modal.component.css']
})
export class RequestsModalComponent implements OnInit {
  constructor(public modal: NgbActiveModal, private userService: UserService, private datePipe: DatePipe, private sharedService: SharedService) { }

  users: any[] = [];
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    this.loadUsers('inactive'); // Initial load with 'inactive' status
  }

  loadUsers(status: string): void {
    this.userService.getUsersByStatus(status).subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }

  approveUser(userId: number): void {
    this.userService.approveUser(userId).subscribe(
      () => {
        console.log(`User with ID ${userId} approved.`);
        this.sharedService.announceApproval(userId); // Notify shared service upon approval
        this.loadUsers('inactive'); // Refresh the modal with new data
      },
      error => {
        console.error(`Error approving user with ID ${userId}:`, error);
      }
    );
  }
  deleteUser(userId: number): void {
    this.userService.deleteUser(userId)
      .subscribe(
        () => {
          console.log('User deleted successfully');
          this.loadUsers('inactive');
        },
        error => {
          console.error('There was an error deleting the user:', error);
          // Optionally handle error (e.g., show error message)
        }
      );
  }
  sortData(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.users.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];
      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
}