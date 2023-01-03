import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class EmailTaken implements AsyncValidator {

  constructor(private auth: AngularFireAuth){

  }

  // validate should be an arrow function in order to keep the scope of the this keyword
  validate = (control: AbstractControl<any, any>): Promise<ValidationErrors | null> => {
    return this.auth.fetchSignInMethodsForEmail(control.value).then(
      response => response.length ? { emailTaken: true } : null
    )
  }
  registerOnValidatorChange?(fn: () => void): void {
    fn()
  }
}
