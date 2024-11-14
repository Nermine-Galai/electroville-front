import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from '../../modal.service';
import { UserService } from '../../user-service.service';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../shared.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'] // corrected styleUrl to styleUrls
})
export class ManageUsersComponent implements OnInit, OnDestroy {
  approvalSubscription: any;
  isActiveComponent = true; // Initialize isActiveComponent to true

  constructor(private modalService: ModalService, private userService: UserService, private datePipe: DatePipe, private sharedService: SharedService) { }

  openModal() {
    this.modalService.openMyModal();
  }

  users: any[] = [];
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    this.loadUsers('active'); // Initial load with 'active' status

    // Subscribe to the shared service for user approval announcements
    this.approvalSubscription = this.sharedService.approvalObservable.subscribe(userId => {
      // Refresh users only if the component is currently active
      if (this.isActiveComponent) {
        this.loadUsers('active');
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.approvalSubscription.unsubscribe();
    this.isActiveComponent = false; // Set isActiveComponent to false on destroy
  }

  loadUsers(status: string): void {
    this.userService.getUsersByStatus(status).subscribe(
      users => {
        this.users = users.map(user => ({
          ...user,
          datejoin: this.datePipe.transform(user.datejoin, 'short')
        }));
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }
  makeAdmin(userId: number): void {
    this.userService.changeUserRole(userId, 'admin').subscribe(
      () => {
        console.log(`User with ID ${userId} promoted to admin.`);
        this.loadUsers('active'); // Refresh user list after role change
      },
      error => {
        console.error(`Error promoting user with ID ${userId} to admin:`, error);
      }
    );
  }

  removeAdmin(userId: number): void {
    this.userService.changeUserRole(userId, 'client').subscribe(
      () => {
        console.log(`Admin role removed from user with ID ${userId}.`);
        this.loadUsers('active'); // Refresh user list after role change
      },
      error => {
        console.error(`Error removing admin role from user with ID ${userId}:`, error);
      }
    );
  }
  deleteUser(userId: number): void {
    this.userService.deleteUser(userId)
      .subscribe(
        () => {
          console.log('User deleted successfully');
          this.loadUsers('active');
        },
        error => {
          console.error('There was an error deleting the user:', error);
          
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