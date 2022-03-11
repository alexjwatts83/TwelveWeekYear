import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface LoremIpsum {
  id: number;
  uid: string;
  word: string;
  words: string[];
  characters: string;
  short_sentence: string;
  long_sentence: string;
  very_long_sentence: string;
  paragraphs: string[];
  question: string;
  questions: string[];
}

@Injectable({
  providedIn: 'root',
})
export class RandomTextServiceService {
  private randomDataApi =
    'https://random-data-api.com/api/lorem_ipsum/random_lorem_ipsum';

  private shortDescriptions: string[] = [];
  private longDescriptions: string[] = [];

  constructor(private http: HttpClient) {
    this.fetchParagraphs();
  }

  getShortDescription(): Observable<string> {
    return this.fetchParagraphs().pipe(
      map((fetched: boolean) => {
        let description = this.shortDescriptions[0];
        this.shortDescriptions = this.shortDescriptions.slice(1);
        return description;
      })
    );
  }

  getLongDescription(): Observable<string> {
    return this.fetchParagraphs().pipe(
      map((fetched: boolean) => {
        let description = this.longDescriptions[0];
        this.longDescriptions = this.longDescriptions.slice(1);
        return description;
      })
    );
  }

  private fetchParagraphs() {
    if (
      this.shortDescriptions.length > 0 &&
      this.shortDescriptions.length > 0
    ) {
      return of(true);
    }
    return this.http.get<LoremIpsum>(this.randomDataApi).pipe(
      map((ipsum: LoremIpsum) => {
        this.shortDescriptions.push(ipsum.words.join(' '));
        this.shortDescriptions.push(ipsum.short_sentence);
        ipsum.paragraphs.forEach((w) => {
          let split = w.split('. ');
          split.forEach((item => {
            this.shortDescriptions.push(item);
          }));
        });
        this.shortDescriptions.push(ipsum.question);
        ipsum.questions.forEach((w) => {
          this.shortDescriptions.push(w.replace('?', '.'));
        });
        this.longDescriptions.push(ipsum.very_long_sentence);
        this.longDescriptions.push(
          `${ipsum.short_sentence} ${ipsum.long_sentence}`
        );
        this.longDescriptions.push(ipsum.characters);
        this.longDescriptions.push(ipsum.paragraphs.join(' '));
        return true;
      })
    );
    // .subscribe((ipsum: LoremIpsum) => {

    // });
  }

  // private setData() {
  //   console.log({ setData: true, data: this.data });
  //   if (this.data.length >= 1) {
  //     this._data$.next(this.data[0]);
  //     this.data = this.data.slice(0, 1);
  //     return;
  //   }
  //   this.fetchParagraphs();
  // }

  // private setLongDescription() {
  //   // console.log({ setLongDescription: true, descriptions: this.descriptions });
  //   if (this.descriptions.length >= 1) {
  //     this._description$.next(this.descriptions[0]);
  //     this.descriptions = this.descriptions.slice(0, 1);
  //     return;
  //   }
  //   this.fetchParagraphs();
  // }

  // getText(): Observable<string> {
  //   // console.log({ getTasks: true });
  //   return this._data$.asObservable();
  // }

  // getDescription(): Observable<string> {
  //   // console.log({ getDescription: true });
  //   return this._description$.asObservable();
  // }
}
