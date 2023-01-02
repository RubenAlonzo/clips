import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class RegisterValidator {

  static match(controlName: string, matchingControlName: string ) : ValidatorFn{
    
    return (group: AbstractControl) : ValidationErrors | null => {
      const control = group.get(controlName)
      const matchingControl = group.get(matchingControlName)
      if(!control || !matchingControl) {
        console.error('Form controls cannot be found')
        return { controlNotFound: false }
      }
  
      const error = control.value === matchingControl.value ? null : { noMatch: true }
      
      matchingControl.setErrors(error)
      
      return error
    }
  }
}
