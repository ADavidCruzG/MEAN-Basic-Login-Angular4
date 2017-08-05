import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../users.service';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user = {email: ''};

  constructor(private usersService: UsersService, private router: Router, private toasterService: ToasterService) {
  }

  ngOnInit() {
  }

  createUser() {
    this.usersService.getUserByEmail(this.user.email)
      .then((userReturned) => {
        if (typeof userReturned === 'undefined' || userReturned === null) {
          this.usersService.createUser(this.user)
            .then(() => {
              this.toasterService.pop('success', 'Proceso exitoso', 'El usuario se creó exitosamente');
              this.router.navigate(['home']);
            }, (err) => {
              console.log(err);
            });
        } else {
          this.toasterService.pop('warning', 'AVISO', 'Ya existe un usuario con el correo ' + this.user.email);
        }
      }, (err) => {
        console.log(err);
      });
  }
}
