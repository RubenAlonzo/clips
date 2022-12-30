import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials  = {
    email: '',
    password: ''
  }

  showAlert = false
  alertMsg = ''
  alertColor = 'blue'
  inSubmission = false

  constructor(private auth: AngularFireAuth){}

  async login(){
    try {
      this.showAlert = true
      this.alertMsg = 'Logging in...'
      this.alertColor = 'blue'
      this.inSubmission = true
      
      await this.auth.signInWithEmailAndPassword(this.credentials.email, this.credentials.password);

    } catch (e) {
      console.error(e)
      this.alertMsg = 'An unexpected error occurred. Please try again later'
      this.alertColor = 'red'
      this.inSubmission = false
      return
    }

    this.alertMsg = 'Success! You are logged in'
    this.alertColor = 'green'
    this.inSubmission = false
  }
}
