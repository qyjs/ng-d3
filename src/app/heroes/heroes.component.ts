import { Component, OnInit } from '@angular/core';

import { Hero, responseType, tagNames } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  private heroes: tagNames[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(
      (data: responseType) => {
        this.heroes = data.body.hotTags.slice(1, data.body.hotTags)
      });
  }

  add(name: string): void {
    console.log(name.trim());
    // name = name.trim();
    // if (!name) { return; }
    // this.heroService.addHero({ name } as Hero)
    //   .subscribe(hero => {
    //     this.heroes.push(hero);
    //   });
  }

  delete(hero: Hero): void {
    console.log(hero);
    // this.heroes = this.heroes.filter(h => h !== hero);
    // this.heroService.deleteHero(hero).subscribe();
  }

}