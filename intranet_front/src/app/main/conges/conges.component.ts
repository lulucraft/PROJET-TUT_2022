import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-conges',
  templateUrl: './conges.component.html',
  styleUrls: ['./conges.component.scss']
})
export class CongesComponent implements OnInit {

  public congesCpt: CongeType[] = [
    { label: 'Acquis', nbr: 0.0 },
    { label: 'Pris', nbr: 0.0 },
    // { label: 'Restants', nbr: 0 },
  ];
  public displayedColumns: string[] = ['label', 'nbr'];

  constructor(private dataService: DataService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    // let congesAcquis = (await this.dataService.getCongesAcquis());
    // if (!congesAcquis) return;

    (await this.dataService.getCongesAcquis()).subscribe((congesAcquis: number) => {
      this.congesCpt[0].nbr = congesAcquis;
    });

    (await this.dataService.getConges()).subscribe((conges: Conge[]) => {
      let nbr: number = 0.0;
      for (let c of conges) {
        nbr = new Date(c.endDate).getTime() - new Date(c.startDate).getTime();
        // Get days from the dates
        this.congesCpt[1].nbr += (nbr / (1000 * 3600 * 24));
      }
      // this.congesCpt[1].nbr = conges.length;
    });
  }

  getCongesRestants(): number {
    return this.congesCpt[0].nbr - this.congesCpt[1].nbr;
    // return this.congesCpt.map(c => c.nbr).reduce((a, b) => a - b, 0);
  }

  demandeConges(): void {
    this.router.navigate(['/main/congesrequest']);
  }

}

interface Conge {
  id: number;
  startDate: string;
  endDate: string;
}

interface CongeType {
  label: string;
  nbr: number;
}
