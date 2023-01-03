import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import IUser from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { EmailTaken } from '../validators/email-taken';
import { RegisterValidator } from '../validators/register-validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  showAlert = false;
  alertMsg = 'Your account is being created';
  alertColor = 'blue';
  inSubmission = false;

  constructor(
    private auth: AuthService,
    private emailTaken: EmailTaken
  ){}

  registerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ], [this.emailTaken.validate]),
    age: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(18),
      Validators.max(120),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
    ]),
    confirm_password: new FormControl('', [
      Validators.required,
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(14),
      Validators.maxLength(14),
    ]),
  }, [RegisterValidator.match('password', 'confirm_password')]);

  async register(){
    this.showAlert = true;
    this.alertMsg = 'Your account is being created';
    this.alertColor = 'blue'
    this.inSubmission = true;

    try{    
      await this.auth.createUser(this.registerForm.value as IUser)
    } catch(e){
      console.error(e);
      this.alertMsg = 'An unexpected error occurred. Please try again later';
      this.alertColor = 'red';
      this.inSubmission = false;
      return // Stop the execution here
    }
    this.alertMsg = 'Success! Your account has been created';
    this.alertColor = 'green';
    this.inSubmission = false;
  }
}
