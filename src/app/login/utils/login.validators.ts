import { AbstractControl, FormControl, FormGroup } from "@angular/forms";

export class LoginValidators {
    
    static ConfirmarSenha(control: FormGroup) {
 
        if (control.get('senha')?.value != control.get('confirmarSenha')?.value)
            return { validaSenha: true};

        return true;
    }
}