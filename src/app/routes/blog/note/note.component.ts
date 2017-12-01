import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // 路由
import {BlogService, PreNoteDto} from "../blog.service"
import marked from 'marked';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  _like=false;
  note= new PreNoteDto();
  loading=true;
  constructor(private route: ActivatedRoute,
              private server:BlogService
              ) { }

  ngOnInit() {
    // 获取路由传值
    this.route.params.subscribe((params) => {
      const id = params.id;
      this.server.GetNote(id).subscribe(r=>{
        r.content = marked(r.content);
        this.note = r;
      },r=>{
        console.error(r);
        },
        ()=>{
        this.loading= false;
        })
    });
  }
  ILike(){
    this._like = !this._like;
    if(this._like){
      this.note.like++;
      this.server.Like(this.note.id);
    }else {
      this.note.like--;
      this.server.UnLike(this.note.id);
    }
  }

}
