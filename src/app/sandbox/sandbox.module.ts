import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { GridComponent } from "./grid/grid.component";
import { StreamComponent } from './stream/stream.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CustomPipePipe } from './stream/pipes/custom-pipe.pipe';
import { RxjsTipsComponent } from './rxjs-tips/rxjs-tips.component';
import { HernanieApiTestingComponent } from './hernanie-api-testing/hernanie-api-testing.component';
import { DimensionalComponent } from './dimensional/dimensional.component';

@NgModule({
    declarations: [
        GridComponent,
        StreamComponent,
        RxjsComponent,
        CustomPipePipe,
        RxjsTipsComponent,
        HernanieApiTestingComponent,
        DimensionalComponent
    ],
    imports: [
        HttpClientModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ]
})


export class SandboxModule {

}