import {ApiBaseService} from "./api-base-service"
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


/**
 * 进一步封装HttpClient，主要解决：
 * 后台apb框架返回数据的解析
 */
export abstract class AbpApiService extends ApiBaseService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  protected abpGet<T>(url: string, params ? : any): Observable<any> {
    return this.get(url,params).map(r=>{
      return this.process<T>(r);
    });
  }
   protected abpPost<T>(url: string, body?: any, params?: any): Observable<any> {
    return this.post(url,body,params).map(r=>{
      return this.process<T>(r);
    })
  }
  private process<T>(r:any):any{
    const data = r as Result;
    if(data.success){
      return data.result as T;
    }else {
      console.error(data.error);
      throw data.error;
    }
  }
}

// 后台返回的结构体
export  class Result{
  success:boolean;
  error:any;
  result:any;
}
