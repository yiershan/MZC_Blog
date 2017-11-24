import {LayoutComponent} from "../layout/layout.component"

export const routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'blog', pathMatch: 'full' },
      { path: 'blog', loadChildren: './blog/blog.module#BlogModule'},
    ]
  },
  { path: '**', redirectTo: 'blog' }
];
