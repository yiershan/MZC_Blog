import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {routes} from "./routes"

import {LayoutModule} from "../layout/layout.module"

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule.forRoot(routes, { useHash: true }), // 这个定义在子模块中，但是是跟路由，我们使用forRoot
  ],
  declarations: []
})
export class RoutesModule { }
