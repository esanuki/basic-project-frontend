import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { SpinnerDialog } from "./dialogs/spinner.dialog";

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html'
})
export class SpinnerComponent {

    constructor(private dialog: MatDialog) {}

    open() {
        this.dialog.open(SpinnerDialog, {
            hasBackdrop: true,
            disableClose: true,
            panelClass: 'dialog-bg-trans',         
        });
    }

    close() {
        this.dialog.closeAll();
    }
}