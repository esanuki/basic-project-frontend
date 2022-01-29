import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'confirmar-dialog',
    templateUrl: './confirmar.dialog.html'
})
export class ConfirmarDialog {

    title: string;
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}


}