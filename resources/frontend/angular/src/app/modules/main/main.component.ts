import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/User.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  user$: Observable<User>;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  links = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => {
      return [
          { name: 'Painel', route: '/' },
          { name: 'Usuários', route: '/users' },
          { name: 'Arquivos', route: '/files' }
        ];
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private authService: AuthService,
    private router: Router) {

    this.user$ = userService.getUserSubject();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
