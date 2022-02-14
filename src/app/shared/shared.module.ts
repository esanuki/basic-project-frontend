import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { SpinnerDialog } from "./component/spinner/dialogs/spinner.dialog";
import { SpinnerComponent } from "./component/spinner/spinner.component";
import { ConfirmarDialog } from "./dialogs/confirmar/confirmar.dialog";
import { DateFormatPipe } from "./pipe/data-format.pipe";

@NgModule({
    declarations: [
        SpinnerComponent,
        SpinnerDialog,
        ConfirmarDialog,
        DateFormatPipe
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        
        FlexLayoutModule,
    ],
    exports: [
        SpinnerComponent,
        DateFormatPipe,
    ]
})
export class SharedModule {}