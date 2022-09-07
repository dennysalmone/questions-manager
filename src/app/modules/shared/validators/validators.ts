import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function arrayLengthValidator(): ValidatorFn {
    return (control:AbstractControl<string[]>) : ValidationErrors | null => {
        const array = control.value;
        if (array.length < 2) {
            return null;
        }
        return {valid:true};
    }
}