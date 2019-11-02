import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

// 装饰器函数，用于为该组件指定 Angular 所需的元数据
@Component({
  selector: 'app-heroes', // 组件的选择器（CSS 元素选择器）app-heroes 用来在父组件的模板中匹配 HTML 元素的名称，以识别出该组件
  templateUrl: './heroes.component.html', // 组件模板文件的位置
  styleUrls: ['./heroes.component.css'] // 组件私有 CSS 样式表文件的位置
})
export class HeroesComponent implements OnInit {

  // 这个参数同时做了两件事：
  // 1. 声明了一个私有 heroService 属性
  // 2. 把它标记为一个 HeroService 的注入点
  constructor(private heroService: HeroService) { }

  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  heroes: Hero[];

  selectedHero: Hero;

  // 生命周期钩子，Angular 在创建完组件后很快就会调用 ngOnInit
  // 这里是放置初始化逻辑的好地方
  ngOnInit() {
    this.getHeroes();
  }

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }

  // 在 ngOnInit 中调用它
  // 你固然可以在构造函数中调用 getHeroes()，但那不是最佳实践。
  // 让构造函数保持简单，只做初始化操作，比如把构造函数的参数赋值给属性。 构造函数不应该做任何事。
  // 它当然不应该调用某个函数来向远端服务（比如真实的数据服务）发起 HTTP 请求。
  // 而是选择在 ngOnInit 生命周期钩子中调用 getHeroes()，之后交由 Angular 处理，
  // 它会在构造出 HeroesComponent 的实例之后的某个合适的时机调用 ngOnInit。
  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
