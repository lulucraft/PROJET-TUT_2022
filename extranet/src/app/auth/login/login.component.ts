import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', './../auth.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private authService: AuthService) {
    this.loginForm = new FormBuilder().group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    let username: string = this.loginForm.controls["username"].value;
    let password: string = this.loginForm.controls["password"].value;
    if (username && password) {
      this.authService.login({ username: username, password: password });
    }
  }

}
