import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';

const headersData ={ headers: new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  decodedToken: any;
  
  public obj: any = [];
  
  constructor(private http: HttpClient,public socket:Socket) { 

  }

  socketopen() {
    this.socket.connect();
  }

  

  public sendMessage(message:any) {
    this.socket.emit('sendMessage', message);
    
  }

  public getmessages = () => {

    return new Observable((observer:any) => {

      this.socket.fromEvent('sendMessage').subscribe((message: any) => {

        observer.next(message);

      });

    });

  };

  public signIn(){
    this.socket.emit('signIn', '');
  }
  
  public endChat(endchat:any){
      this.socket.emit('endChat', endchat);
  }

  public getpickmessages = () => {

    return new Observable((observer:any) => {

      this.socket.fromEvent('pickEvent').subscribe((message: any) => {

        observer.next(message);

      });

    });

  };
  
  public getshortedmessages = () => {

    return new Observable((observer:any) => {

      this.socket.fromEvent('GetExgShortcodesCust').subscribe((message: any) => {

        observer.next(message);

      });

    });

  };  
  postmethod(endpoint: string, obj: object): Observable<any> {
    return this.http.post(`${environment.apiUrl}${endpoint}`, obj)
    .pipe(map(
      (res: any) => {
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

    deletemethod(endpoint:string,obj:object): Observable<any>{
      return this.http.request('delete',`${environment.apiUrl}${endpoint}`, {body : obj})
      .pipe(map(
        (res: any) => {
        return res;
      }));
    }
 
    

       
                 
}
