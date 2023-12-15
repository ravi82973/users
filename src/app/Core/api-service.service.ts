import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private storeData = new BehaviorSubject<any>({})

  private filterData = new BehaviorSubject<any>({
    obj : '',
  })

  private retainData = new BehaviorSubject<any>({})

  private StoreList = new BehaviorSubject<any>({})

  private BrandList = new BehaviorSubject<any>({})

  private FilterList = new BehaviorSubject<any>({})

  constructor(private http: HttpClient,private titleService: Title) { }

  setFilterList(data){
    console.log(data);
    this.FilterList.next(data);

  }

  getFilterList(){
    // console.log(this.FilterList);

    return this.FilterList.asObservable();
  }

  setBrandList(data){
    console.log(data);
    this.BrandList.next(data);

  }
  getBrandList(){
    return this.BrandList.asObservable()
  }

  setStoreList(data)
{
  console.log(data);

this.StoreList.next(data);
}
getStoreList()
{
return this.StoreList.asObservable()
}


setStoreData(data)
{
  console.log(data);

this.storeData.next(data);
}
getStoreData()
{
return this.storeData.asObservable()
}
  postmethod(endpoint: string, obj: object): Observable<any> {
    console.log(`${environment.apiUrl}${endpoint}`);

    return this.http.post(`${environment.apiUrl}${endpoint}`, obj)
      .pipe(map(
        (res: any) => {
         // console.log(res);

          return res;
        }));
  }
  putmethod(endpoint: string, obj: object): Observable<any> {
    return this.http.put(`${environment.apiUrl}${endpoint}`, obj)
      .pipe(map(
        (res: any) => {
          return res;
        }));
  }
    postmethodOne(endpoint: string, obj: object): Observable<any> {
    
     return this.http.post(`${environment.axelOneUrl}${endpoint}`, obj).pipe(
      map((res: any) => {
         return res; })
         );
        }

  // getCountSrvc(){
  //   const url=environment.apiUrl;
  //   return this.http.post('ucarsummary/axiomtotalcounts',url)
  // }
  getCountSrvc(){
    const url = "ucarsummary/axiomtotalcounts"
    return this.http.post(environment.apiUrl,+url)
  }

  getBrandsData(){

    return this.http.post('https://api.axelautomotive.com/api/brands/get','')
  }


  setFilterExpression(data: any) {
    //console.log(data);

    this.filterData.next(data);
  }
  getFilterExpression() {
    return this.filterData.asObservable();
  }
  directSignIn(userId: any){

    return this.http.request('post', `${environment.apiUrl}users/userexists`, userId);
  }
  // getDealerSores(url,obj){
  //   return this.http.post('https://devaxeloneapi.axelautomotive.com/api/'+url,obj)
  // }

  getSessionToken(url,obj){
    return this.http.post('https://devaxeloneapi.axelautomotive.com/api/'+url,obj)

  }
  setRetainData(data)
  {
   // console.log(data);

    this.retainData.next(data)
  }
  getRetainData()
  {
    return this.retainData.asObservable();
  }

getTitle(title:string){

    this.titleService.setTitle(title);
}

// getStoreRegions(url,obj){
//   return this.http.post('http://devaxeloneapi.axelautomotive.com/api/'+url,obj)
// }




}
