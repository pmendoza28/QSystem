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
import { AnimationTutorialComponent } from './animation-tutorial/animation-tutorial.component';
import { TableAnimationComponent } from './table-animation/table-animation.component';
import { MatTableModule } from "@angular/material/table";
import { BrowserAnimationsModule, NoopAnimationsModule } from "@angular/platform-browser/animations";
import { CustomTableComponent } from './custom-table/custom-table.component';

@NgModule({
    declarations: [
        GridComponent,
        StreamComponent,
        RxjsComponent,
        CustomPipePipe,
        RxjsTipsComponent,
        HernanieApiTestingComponent,
        DimensionalComponent,
        AnimationTutorialComponent,
        TableAnimationComponent,
        CustomTableComponent
    ],
    imports: [
        HttpClientModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatTableModule,
        BrowserAnimationsModule,
    ]
})


export class SandboxModule {

}