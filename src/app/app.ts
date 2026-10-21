import { Component, signal } from '@angular/core';
import { HeadBar } from './components/head-bar/head-bar';
import { SearchBar } from './components/search-bar/search-bar';
import { Auto } from './interfaces/auto';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
@Component({
  imports: [HeadBar, SearchBar],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
    protected readonly title = signal('showroom-auto');

    constructor(private http: HttpClient) {
      this.title.set('My showroom-auto');
    }
   
ngOnInit() {
  this.http.get<Auto[]>('autos.json').subscribe(data => {
    this.autoList = data;

    this.http.get<Auto[]>('autos-scrapees.json').subscribe(scrapees => {
      this.autoList = [...this.autoList, ...scrapees];
    });
  });
}

  selectedCar !: Auto 
  selectCar(auto: Auto) {
    this.selectedCar = auto;
  }
  autoList: Auto[] = [];
}
