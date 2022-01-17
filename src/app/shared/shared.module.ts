import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FlexLayoutModule } from "@angular/flex-layout";
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { SpinnerDialog } from "./component/spinner/dialogs/spinner.dialog";
import { SpinnerComponent } from "./component/spinner/spinner.component";

@NgModule({
    declarations: [
        SpinnerComponent,
        SpinnerDialog
    ],
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        FlexLayoutModule,
    ],
    exports: [
        SpinnerComponent
    ]
})
export class SharedModule {}