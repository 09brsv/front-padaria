import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchIcon = faMagnifyingGlass;
  fieldSearch = new FormControl();

  @Output() searchChange = new EventEmitter<Observable<string | undefined>>();

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.searchChange.emit(this.fieldSearch.valueChanges)
  }

  irParaTelaInicial() {
    this.router.navigate([this.router.url]);
  }


}
