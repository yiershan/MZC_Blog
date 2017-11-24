import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteComponent } from './note/note.component';
import { Routes, RouterModule } from '@angular/router';

// 定义的路由
const routes: Routes = [
  { path: '', redirectTo: 'list' },
  { path: 'list', component: NoteListComponent },
  { path: 'note/:id', component: NoteComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes), // 子模块注入路由要用forChild
  ],
  // 路由中使用了的component要在这里declaration
  declarations: [NoteListComponent, NoteComponent]
})
export class BlogModule { }
