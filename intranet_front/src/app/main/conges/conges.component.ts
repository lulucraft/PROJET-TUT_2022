import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, map, of, throwError } from 'rxjs';
import { Conge } from 'src/app/models/conge';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-conges',
  templateUrl: './conges.component.html',
  styleUrls: ['./conges.component.scss']
})
export class CongesComponent implements OnInit {

  // pageEvent?: PageEvent;
  @ViewChild('paginator') paginator!: MatPaginator;
  // dataSource!: MatTableDataSource<Conge>;

  // Conges counter table
  public congesCpt: CongeType[] = [
    { label: 'Acquis', nbr: 0.0 },
    { label: 'Pris', nbr: 0.0 },
  ];
  public displayedColumns: string[] = ['label', 'nbr'];

  // Conges request table
  // public congesRequestsNotValidated: Conge[] = [];
  public congesRequestsNotValidated: MatTableDataSource<Conge> = new MatTableDataSource<Conge>();
  public columnsCongesRequestsNotValidated: string[] = ['creationDate', 'startDate', 'endDate', 'btn_del'];

  constructor(private dataService: DataService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.dataService.getCongesAcquis().subscribe((congesAcquis: number) => {
      this.congesCpt[0].nbr = congesAcquis;
    });


  }

  ngAfterViewInit() {
    // this.dataSource = new MatTableDataSource<Conge>(this.congesRequestsNotValidated);
    // this.dataSource.paginator = this.paginator;
    // this.congesRequestsNotValidated = new MatTableDataSource<Conge>();
    this.congesRequestsNotValidated.paginator = this.paginator;

    this.dataService.getConges().subscribe((conges: Conge[]) => {
      // Get unvalidated conges
      // this.congesRequestsNotValidated = conges.filter(c => c.validated === false);
      // this.dataSource.data = this.congesRequestsNotValidated;
      this.congesRequestsNotValidated.data = conges.filter(c => c.validated === false);

      let nbr: number = 0.0;
      for (let c of conges) {
        nbr = new Date(c.endDate).getTime() - new Date(c.startDate).getTime();
        // Get days from the dates (+1 to include the first day)
        this.congesCpt[1].nbr += (nbr / (1000 * 3600 * 24)) + 1;
      }
    });
  }

  getCongesRestants(): number {
    return this.congesCpt[0].nbr - this.congesCpt[1].nbr;
  }

  isAdmin(): boolean {
    return this.authService.isUserAdmin();
  }

  demandeConges(): void {
    this.router.navigate(['/main/congesrequest']);
  }

  deleteConge(congeId: number): void {
    this.dataService.deleteCongeRequest(congeId)
      .pipe(
        catchError(err => {
          alert("erreur lors de la suppression de la demande de congés");
          return throwError(() => console.error(err));
        })
      )
      .subscribe((resp: string) => {
        console.info(resp);
        // Remove conges request from table
        // this.congesRequestsNotValidated = this.congesRequestsNotValidated.filter(cr => cr.id !== congeId);
        // this.dataSource.data = this.congesRequestsNotValidated;
        this.congesRequestsNotValidated.data = this.congesRequestsNotValidated.data.filter(cr => cr.id !== congeId);
      });

  }

}

interface CongeType {
  label: string;
  nbr: number;
}
