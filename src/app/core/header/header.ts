import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { HeaderData, HeaderService } from '../../services/header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  data!: HeaderData;

  constructor(
    private headerService: HeaderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.headerService.headerData$.subscribe(data => {
      this.data = data;
    });
  }

  get progress(): number {
    if (!this.data?.total) return 0;
    return (this.data.owned / this.data.total) * 100;
  }

  toLinkAlbum() {
    this.router.navigate(['/album']);
  }
}
