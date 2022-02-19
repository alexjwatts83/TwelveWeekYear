import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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

  private data: string[] = [];
  private descriptions: string[] = [];
  private _data$ = new BehaviorSubject<string>('');
  private _description$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
    this.fetchParagraphs();
  }

  private fetchParagraphs() {
    console.log('calling fetchParagraphs');
    this.http
      .get<LoremIpsum>(this.randomDataApi)
      .subscribe((ipsum: LoremIpsum) => {
        this.data.push(ipsum.words.join(' '));
        this.data.push(ipsum.short_sentence);
        ipsum.paragraphs.forEach((w) => {
          this.data.push(w);
        });
        this.data.push(ipsum.question);
        ipsum.questions.forEach((w) => {
          this.data.push(w);
        });
        this.setData();
        this.descriptions.push(ipsum.very_long_sentence);
        this.descriptions.push(
          `${ipsum.short_sentence} ${ipsum.long_sentence}`
        );
        this.descriptions.push(ipsum.characters);
        this.descriptions.push(ipsum.paragraphs.join(' '));
        this.setLongDescription();
      });
  }

  private setData() {
    console.log({ setData: true, data: this.data });
    if (this.data.length >= 1) {
      this._data$.next(this.data[0]);
      this.data = this.data.slice(0, 1);
      return;
    }
    this.fetchParagraphs();
  }

  private setLongDescription() {
    console.log({ setLongDescription: true, descriptions: this.descriptions });
    if (this.descriptions.length >= 1) {
      this._description$.next(this.descriptions[0]);
      this.descriptions = this.descriptions.slice(0, 1);
      return;
    }
    this.fetchParagraphs();
  }

  getText(): Observable<string> {
    console.log({ getTasks: true });
    return this._data$.asObservable();
  }

  getDescription(): Observable<string> {
    console.log({ getDescription: true });
    return this._description$.asObservable();
  }
}
