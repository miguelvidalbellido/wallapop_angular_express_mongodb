import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  // errors: Errors = {errors: {}};
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private _snackbar: MatSnackBar
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }
  // Snackbar
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  authForm: FormGroup;

  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl());
      }
      this.cd.markForCheck();
    });
  }

  submitForm() {
    this.isSubmitting = true;
    // this.errors = {errors: {}};


    const credentials = this.authForm.value;
    this.userService
    .attemptAuth(this.authType, credentials)
    .subscribe(
      data => this.router.navigateByUrl('/'),
      err => {
        // this.errors = err;
        this.errorControl(err.message)
        this.isSubmitting = false;
        this.cd.markForCheck();
      }
    );
  }

  errorControl(errMsg: String) {
    switch (errMsg) {
      case 'username already exists':
        this.showSnackBar("El usuario introducido no es valido");
        break;
      case 'email already exists':
        this.showSnackBar("El email introducido no es valido");
        break;
      case 'Unauthorized: Wrong password':
        this.showSnackBar("Contraseña Incorrecta");
        break;
      case 'User Not Found':
        this.showSnackBar("La dirección email no existe");
        break;
      default:
        console.log("err");
    }
  
  }

  showSnackBar(msg: string) {
    this._snackbar.open(msg, 'Aceptar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}