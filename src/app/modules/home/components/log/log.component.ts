import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    const token = this.authService.getToken();
    console.log("token in log is: ",token);
  }

}
