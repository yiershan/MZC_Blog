import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // 路由
import {BlogService, PreNoteDto} from "../blog.service"
import marked from 'marked';
import {Float,Bubble} from "../../../share/animations"
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
  animations: [ Float,Bubble ]
})
export class NoteComponent implements OnInit {

  _like=false;
  note= new PreNoteDto();
  loading=true;
  State="";
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
      this.State="Bubble";
      this.server.Like(this.note.id);
    }else {
      this.note.like--;
      this.State="UnBubble";
      this.server.UnLike(this.note.id);
    }
  }

}
