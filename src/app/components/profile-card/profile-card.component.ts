import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/models/user';
import { AuthStorageService } from 'src/services/auth-storage.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {
  user: BehaviorSubject<User>;

  constructor(private authStore: AuthStorageService) {
    this.user = authStore.currentUser;
  }

  ngOnInit(): void { }

}
