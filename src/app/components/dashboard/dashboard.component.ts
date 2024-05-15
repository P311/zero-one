import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  ResumesService,
} from '../../../../api/api';
import { catchError, map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  constructor(private authService: AuthService, private resumesService: ResumesService){}

  ngOnInit(){
    // this.resumesService.resumesGet().pipe(
    //   map((res: string) => {
    //     console.log(res);
    //     return res;
    //   }),
    //   catchError((err) => {
    //     console.log(err);
    //     return err;
    //   }),
    // ); 
    this.resumesService.resumesGet().subscribe((res) => {console.log('//'); console.log(res)}, (err)=>{console.log(err); console.log("??");})
  }
}
