import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
	// 你用 @Input 装饰器来让 hero 属性可以在外部的 HeroesComponent 中绑定。hero 属性 类型是 Hero （id name）
	@Input() hero: Hero;
  constructor() { }

  ngOnInit() {
  }

}
