import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

/*
type UserInfos = {
  name: string,
  surname: string,
  address: string,
  postal_code?: number,
  city: string,
  phone_number?: number,
  email: string,
  gender: {M: boolean, F: boolean},
  country: string,
  password: string,
  login: string
}
*/

@Component({
  selector: 'user-formulary',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-formulary.component.html',
  styleUrl: './user-formulary.component.css'
})
export class UserFormularyComponent implements OnInit {
  profile_form: FormGroup;
  data_resume_visible: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.profile_form = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(5)]],
      last_name: ['', [Validators.required, Validators.minLength(5)]],
      login: ['', [Validators.required, Validators.minLength(5)]],
  
      address: this.formBuilder.group({
        street: ['', Validators.required],
        postal_code: ['', [Validators.required, Validators.min(10000), Validators.max(99999)]],
        city: ['', Validators.required],
        country: ['', Validators.required],
      }),
  
      contact_infos: this.formBuilder.group({
        phone_number: ['', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]],
        email: ['', [Validators.required, Validators.email]],
      }),
  
      gender: this.formBuilder.group({
        genderM: ['', Validators.required],
        genderF: ['', Validators.required],
      }),
  
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      confirm_password: ['', [Validators.required, , Validators.minLength(5), Validators.maxLength(15)]],
    });
  }

  public firstName() {
    return this.profile_form.get('first_name')?.value;
  }

  public lastName() {
    return this.profile_form.get('last_name')?.value;
  }

  public login() {
    return this.profile_form.get('login')?.value;
  }

  public street() {
    return this.profile_form.get('address.street')?.value;
  }

  public postalCode() {
    return this.profile_form.get('address.postal_code')?.value;
  }

  public city() {
    return this.profile_form.get('address.city')?.value;
  }

  public country() {
    return this.profile_form.get('address.country')?.value;
  }

  public phoneNumber() {
    return this.profile_form.get('contact_infos.phone_number')?.value;
  }

  public email() {
    return this.profile_form.get('contact_infos.email')?.value;
  }

  public genderM() {
    return this.profile_form.get('gender.genderM')?.value;
  }

  public genderF() {
    return this.profile_form.get('gender.genderF')?.value;
  }

  public password() {
    return this.profile_form.get('password')?.value;
  }

  public passwordConfirmation() {
    return this.profile_form.get('confirm_password')?.value;
  }

  public validatePassword(): boolean {
    return this.password() === this.passwordConfirmation();
  }
  
  public genderValueChange(changedGender: string) : void {
    switch (changedGender) {
      case 'F':
        if (this.genderF()) { 
          this.profile_form.patchValue({ 'gender': { genderM: true } });
        }
        else { this.profile_form.patchValue({ 'gender': { genderM: false } }); }
        break;
      default:
        if (this.genderM()) { this.profile_form.patchValue({ 'gender': { genderF: true } }); }
        else { this.profile_form.patchValue({ 'gender': { genderF: false } }); }
        break;
    }
  }
  
  public onSubmit() {
    if (!this.validatePassword()) {
      // A CHANGER POUR QQC DE + VISUEL (PAS DANS LA CONSOLE) SI J'EN AI L'ENVIE
      throw new Error("Password and confirmation do not match !");
    }
    else {
      // A CHANGER POUR QQC DE + VISUEL (PAS DANS LA CONSOLE) SI J'EN AI L'ENVIE
      console.log("User registered.");
      this.data_resume_visible = true;
    }
  }
}
