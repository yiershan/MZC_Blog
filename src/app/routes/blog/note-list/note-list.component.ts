import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import marked from 'marked';
import {BlogService, PreNoteDto,GetNoteDto} from "../blog.service"

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  preNoteList:PreNoteDto[]=[];
  loadMore = false;
  loading =false;
  key="";

  constructor(private router: Router,
  private blogService :BlogService
  ) { }

  ngOnInit() {
    this.getNoteList();
  }
  getNoteList(f=false){
    this.loading= true;
    if(f)this.preNoteList =[];
    const param = new GetNoteDto();
    param.key = this.key;
    param.SkipCount = this.preNoteList.length;
    this.blogService.GetNoteList(param).do(()=>{
      this.loading = false;
    }).subscribe(m=> {
      this.loadMore = m.totalCount>this.preNoteList.length;
      m.items.forEach((v,i)=>{
        v.content = marked(v.content);
        this.preNoteList.push(v);
      });
    });
  }
  linkTo(id:number){
    this.router.navigate(['blog/note', id]);
  }

}


