import { Component, Input, Output , EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Auto } from '../../interfaces/auto';
@Component({
  imports: [FontAwesomeModule],
  selector: 'app-search-bar',
  styleUrl: './search-bar.css',
  templateUrl: './search-bar.html',
})
export class SearchBar {
  faMagnifyingGlass = faMagnifyingGlass;
  @Input() autos:Auto[]=[] ;
  
// Événement qui permet d'envoyer la voiture sélectionnée au composant parent.
@Output() selectAutoEvent = new EventEmitter<Auto>(); 
 selectedAutos : Auto[]=[];
 ngOnInit() {
  this.selectedAutos = this.autos;
}


selectAutos(searchText: string) {
  const search = searchText.trim().toLowerCase();

  if (search) {
    this.selectedAutos = this.autos.filter(auto =>
      auto.brand.toLowerCase().includes(search) ||
      auto.model.toLowerCase().includes(search)
    );
  } else {
    this.selectedAutos = this.autos;
  }
}

selectCar(auto: Auto) {
  this.selectAutoEvent.emit(auto);
}

sortAutos(order: string) {
  if (order === 'asc') {
    this.selectedAutos.sort((a, b) => a.price - b.price);
  } else if (order === 'desc') {
    this.selectedAutos.sort((a, b) => b.price - a.price);
  } else {
    this.selectedAutos = [...this.autos];
  }
}
resetFilters(brandInput: HTMLInputElement, sortSelect: HTMLSelectElement) {
  brandInput.value = '';
  sortSelect.value = '';
  this.selectedAutos = [...this.autos];
}
@Input() hideCars = false;
}

