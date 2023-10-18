import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User, UserService } from 'src/app/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{

  
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder) {
      this.formUpdateUser = this.formBuilder.group({
        username: '',
        email: '',
        password: '',
        cp: '',
        f_nac: '',
        profileImage: ''
      });
  }

  formUpdateUser!: FormGroup;

  user?: User;

  ngOnInit(): void {
    this.loadFormUpdate();
  }

  loadFormUpdate() {
    // Load data form
    this.user = this.userService.getCurrentUser();
    if(this.user) {
      this.formUpdateUser.patchValue(this.user);
    }
  }

  updateUser() {
    const dataUser = this.formUpdateUser.value;
    
    if(dataUser) {
      this.userService.update(dataUser);
    }
    
  }

}
