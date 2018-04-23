import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BlogApiService} from  "mzc-ng-api/src/provider"
export * from "mzc-ng-api/src/provider"
@Injectable()
export class BlogService extends BlogApiService{
  constructor(protected http: HttpClient) {
    super(http)
  }
}
