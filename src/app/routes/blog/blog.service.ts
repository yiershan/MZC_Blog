import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {AbpApiService} from "../../core/services/abp-api-service"
import {environment} from "../../../environments/environment"

const blogApiUrl ={
  getNoteList :environment.SERVER_URL+"/api/services/app/NoteServer/GetPreNoteList",
  getNote:environment.SERVER_URL+"/api/services/app/NoteServer/GetNote",
  like:environment.SERVER_URL+"/api/services/app/NoteServer/Like",
  unLike:environment.SERVER_URL+"/api/services/app/NoteServer/UnLike"
};
// 要使该服务可以依赖注入，需要加上下面这个标签，并且在模块中声明
@Injectable()
export class BlogService extends AbpApiService{

  constructor(protected http: HttpClient) {
    super(http)
  }

  public GetNoteList(params:GetNoteDto):Observable<PagedData<PreNoteDto>> {
    const url = blogApiUrl.getNoteList;
    return this.abpGet<PagedData<PreNoteDto>>(url,params);
  }

  public GetNote(id:number):Observable<PreNoteDto>{
    const url = blogApiUrl.getNote+"?Id="+id;
    return this.abpGet<PreNoteDto>(url);
  }

  public Like(id:number):void{
    const url = blogApiUrl.like;
    this.abpPost(url,{id:id}).subscribe();
  }
  public UnLike(id:number):void{
    const url = blogApiUrl.unLike;
    this.abpPost(url,{id:id}).subscribe();
  }
}
export class GetNoteDto{
  SkipCount = 0;
  MaxResultCount = 10;
  key = '';
}
export class PreNoteDto{
  id:number;
  title:string;
  creationTime:string;
  like:number;
  collect:number;
  scan:number;
  isPublic:boolean;
  content:string;
}
// 分页数据类
export class PagedData<T>{
  items:T[];
  totalCount:number;
}
