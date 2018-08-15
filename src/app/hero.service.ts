import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
	// 把message 的service 注入给 HeroService， HeroService注入到 HeroesComponent
  constructor(
  	private messageService: MessageService
  ) { }

  getHeroes(): Observable<Hero[]> {
  	this.messageService.add('HeroService: fetched heroes');

  	return of(HEROES);
	}
}
