import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../users.service';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  user = {};

  constructor(private usersService: UsersService, private router: Router, private toasterService: ToasterService) {
  }

  ngOnInit() {
  }

  loginUser() {
    let userToLogin = this.user;

    this.usersService.getUserByEmailToLogin(userToLogin)
      .then((res) => {
        if (res['status'] === 404) {
          // User does not exist, code 404 from server
          this.toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No existe un usuario con el correo ' + userToLogin['email']
          });
        } else if (res['status'] === 4041) {
          // Wrong password, code 4041 from server
          this.toasterService.pop({
            type: 'warning',
            title: 'Aviso',
            body: 'Contraseña incorrecta'
          });
        } else if (res['status'] === 200) {
          // Successful authentication, code 200 from server
          this.toasterService.pop({
            type: 'success',
            title: 'Bienvenido',
            body: 'Hola ' + res['user'].firstName + ' ' + res['user'].lastName
          });
          this.router.navigate(['welcome']);
        }
      }, (err) => {
        console.log(err);
      });
  }

}
