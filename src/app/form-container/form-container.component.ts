import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatStepper} from '@angular/material';
import {User} from '../models/User';
import {CommunicationService} from '../services/communication.service';
@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.css']
})
export class FormContainerComponent implements OnInit {
  registerForm: FormGroup;
  registerFormJob: FormGroup;
  submitted = false;
  serverResult = '';
  user: User;
  constructor(
    private formBuilder: FormBuilder,
    private startService: CommunicationService
  ) {

  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      prenom: ['', [Validators.required, Validators.minLength(3)]],
      email: new FormControl('', [Validators.required, Validators.email]),
      cin: ['', [Validators.required, Validators.minLength(8)]],
      adresse: ['', [Validators.required, Validators.minLength(5)]],
      tel: ['', [Validators.required, Validators.minLength(8)]]
  });
    this.registerFormJob = this.formBuilder.group({
      specialty: ['', [Validators.required, Validators.minLength(3)]],
      department: ['', [Validators.required, Validators.minLength(3)]],
      grade: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSend(stepper: MatStepper) {
    this.user = new User();
    this.user.name = this.registerForm.controls['nom'].value;
    this.user.lastname = this.registerForm.controls['prenom'].value;
    this.user.email = this.registerForm.controls['email'].value;
    this.user.cin = this.registerForm.controls['cin'].value;
    this.user.adress = this.registerForm.controls['adresse'].value;
    this.user.phone = this.registerForm.controls['tel'].value;
    this.user.specialty = this.registerFormJob.controls['specialty'].value;
    this.user.department = this.registerFormJob.controls['department'].value;
    this.user.grade = this.registerFormJob.controls['grade'].value;
    console.log(this.user.toString());
    this.startService.start(this.user).subscribe(
      result => {
        this.serverResult = 'Your information are sent with success';
        this.submitted = true;
        stepper.next();
      },
      error => {
        this.serverResult = 'Your information are not sent Server Error!';
        this.submitted = true;
        stepper.next();
      }
    );
  }
  showAlert(title: string, description: string) {

  }
}
