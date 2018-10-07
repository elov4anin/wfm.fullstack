import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MaterialService} from '../../shared/classes/material.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  aSub: Subscription;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this._route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterialService.toast('Теперь вы можете зайти в систему используя свои данные');
        // Теперь вы можете зайти в систему используя свои данные
      } else if (params['accessDenied']) {
        MaterialService.toast('Для начала авторизуйтесь в системе');
        // Для начала авторизуйтесь в системе
      } else if (params['sessionFailed']) {
        MaterialService.toast('Пожайлуста войдите в систему заново');
      }

    });
  }

  onSubmit() {
    this.form.disable();
    this.aSub = this._authService.login(this.form.value).subscribe(
      () => this._router.navigate(['/overview']),
      error1 => {
        MaterialService.toast(error1.error.message);
        this.form.enable();
      }
    );

  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}
