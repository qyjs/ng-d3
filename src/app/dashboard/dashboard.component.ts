import { Component, OnInit, AfterContentInit, ViewChild } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

import * as d3 from 'd3';

import { LineChart } from './line.chart';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements AfterContentInit {
  heroes: Hero[] = [];
  radius = 10;

  chart: LineChart;
  @ViewChild('target') target;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
    this.chart = new LineChart(this.target.nativeElement);
    this.chart.render();
  }

  ngAfterContentInit() {
    d3.select('p').style('color', 'red');
  }

  colorMe() {
    d3.select('button').style('color', 'red');
  }

  clicked(event: any) {
    console.log(event);
    d3.select(event.target).append('circle')
      .attr('cx', event.x)
      .attr('cy', event.y)
      .attr('r', () => {
        return this.radius;
      })
      .attr('fill', 'red');
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}