import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  MessageSend(obj: any) {
    return this.http.post(`https://devtwsms.axelautomotive.com/msgSent`, obj, {
      responseType: 'text',
    });
  }

  getStores(obj: any) {
    return this.http.post(
      `https://devtwapi.axelautomotive.com/api/Conversation/getTwilioInfo`,
      obj
    );
  }

  getTemplateData(obj: any) {
    return this.http.post(
      `https://devtwapi.axelautomotive.com/api/Template/GETTEMPLATES`,
      obj
    );
  }
  saveTemplate(obj: any) {
    return this.http.post(
      `https://devtwapi.axelautomotive.com/api/Template/SETTEMPLATES`,
      obj
    );
  }
}

