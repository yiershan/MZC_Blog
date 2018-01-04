import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import marked from 'marked';
import {BlogService, PreNoteDto,GetNoteDto} from "../blog.service";
import {Float} from "../../../share/animations"

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css'],
  animations: [ Float ]
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
    this.getNoteList(true);
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
      m.items.forEach((v,i)=>{
        v.content = marked(v.content);
        this.preNoteList.push(v);
      });
      this.loadMore = m.totalCount>this.preNoteList.length;
    });
  }
  linkTo(id:number){
    this.router.navigate(['blog/note', id]);
  }

}


