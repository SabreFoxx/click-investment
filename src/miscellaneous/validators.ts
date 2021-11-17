import { FormControl } from "@angular/forms";

export function passwordValidation(control: FormControl): { [s: string]: boolean } {
    return (control.value.match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/))
        ? { "incorrectFormat": true } : null;
}