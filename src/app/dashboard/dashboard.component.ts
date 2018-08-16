import { Component, OnInit } from '@angular/core';
import { responseType, tagNames } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  private heroes: tagNames;
  constructor(private heroService: HeroService) {
   }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(
      (data: responseType) => {
        if (data) {
          this.heroes = data.body.hotTags.slice(1, data.body.hotTags.length)
        }
      },
      error => {
        console.log(error)
      });
  }

  // transformTagsToDisplay(tags): void {
  //   let all = tags.sort(function (a, b) {
  //     return a.tagId - b.tagId
  //   }).reduce(function (map, tag) {
  //     tag.name = tag.tagName
  //     tag.id = tag.tagId
  //     let parentTag = map[tag.parentTagId]
  //     if (parentTag) {
  //       parentTag.tags = parentTag.tags || []
  //       parentTag.tags.push(tag)
  //     }
  //     map[tag.tagId] = tag
  //     return map
  //   }, {})
  //   return Object.keys(all).map(function (id) {
  //     let item = all[id]
  //     return item.parentTagId == null ? item : null
  //   }).filter(function (tag) {
  //     return tag != null
  //   })
  // }


}
