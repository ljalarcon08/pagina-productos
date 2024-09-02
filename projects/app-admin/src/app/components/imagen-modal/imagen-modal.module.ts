import { NgModule } from "@angular/core";
import { ImagenModalComponent } from "./imagen-modal.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [CommonModule,FormsModule],
    exports: [ImagenModalComponent],
    declarations: [ImagenModalComponent],
    providers: [],
 })
 
 export class ImagenModalModule {
 }