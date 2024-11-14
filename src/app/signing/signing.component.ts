import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user-service.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SharedService } from '../shared.service';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrl: './signing.component.css'
})
export class SigningComponent implements OnInit{
  hide = signal(true);
  successMessage: any;
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  isLogin = true;

  loginForm: FormGroup;
  signupForm: FormGroup;
  checkboxChecked = false;
  errorMessage: string | null = null;

  username: string | null = null;

  constructor(private formBuilder: FormBuilder,private userService: UserService,private router: Router,private sharedService: SharedService,private cartService: CartService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      businessName: ['', this.checkboxChecked ? Validators.required : null],
      businessAddress: ['', this.checkboxChecked ? Validators.required : null],
      role: ['client', Validators.required],
      status: ['active', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      datejoin: [new Date().toISOString(), Validators.required]
    }, { validators: this.matchPasswords });
  }
  onCheckboxChange(event: any): void {
    this.checkboxChecked = event.checked;
    const validators = this.checkboxChecked? [Validators.required] : null;
    this.signupForm.get('businessName')?.setValidators(validators);
    this.signupForm.get('businessAddress')?.setValidators(validators);
    this.signupForm.get('businessName')?.updateValueAndValidity();
    this.signupForm.get('businessAddress')?.updateValueAndValidity();
    this.signupForm.patchValue({ role: event.checked ? 'vendor' : 'client' });
    this.signupForm.patchValue({ status: event.checked ? 'inactive' : 'active' });
  }
  matchPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      group.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      group.get('confirmPassword')?.setErrors(null);
    }
    return null;
  }

  onSubmitLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.userService.signIn(this.loginForm.value).subscribe({
      next: response => {
        console.log('Login successful', response);
        this.errorMessage = null;
        
        this.router.navigate(['']);
        setTimeout(() => {
          window.location.reload();
        }, 100); 
        
        
      },
      error: err => {
        this.errorMessage = err.error ? err.error : 'Login failed. Please try again.';
      }
      
    });
    
  }

  onSubmitSignup() {
    console.log(this.signupForm);
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
        return;
    }
    this.userService.signUp(this.signupForm.value).subscribe({
        next: response => {
            console.log('Signup successful', response);
            this.errorMessage = null; // Clear any previous error message
            this.successMessage = response; // Set the response message to be displayed
            const signInData = {
              email: this.signupForm.value.email,
              password: this.signupForm.value.password
            };
            this.userService.signIn(signInData).subscribe({
              next: signInResponse => {
                console.log('Sign in successful', signInResponse);
                this.router.navigate(['']); // Navigate to the home page or any other page
                setTimeout(() => {
                  window.location.reload();
                }, 100); 
              },
              error: signInErr => {
                this.errorMessage = signInErr.error? signInErr.error : 'Sign in failed. Please try again.';
                console.log(this.errorMessage);
              }
            });
        },
        error: err => {
            this.errorMessage = 'Signup failed. Please try again.';
            console.log(this.errorMessage);
        }
    });
}

  ngOnInit(): void {
    const user = this.userService.getUser();
    this.username = user.username;
  }
    
  }
  
  


