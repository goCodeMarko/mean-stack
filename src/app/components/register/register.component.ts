import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { CustomValidators } from "../../shared/custom-validators";
import { AuthService } from "../../services/auth.service";
import { IUser } from "../../interfaces/IUser";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  users: any = [];

  public validationMessages = {
    'name': {
      'required': "Name is required.",
      'minlength': "Name must be greater than 2 characters.",
      'maxlength': "Name must be less than 36 characters."
    },
    'username': {
      'required': "Username is required.",
      'minlength': "Username must be greater than 5 characters.",
      'maxlength': "Username must be less than 16 characters.",
      'exist': "Username already taken."
    },
    'email': {
      'required': "Email is required.",
      'emailDomain': "Email domain should be @gmail.com."
    },
    'password': {
      'required': "Password is required.",
      'minlength': "Password must be greater than 5 characters.",
      'maxlength': "Password must be less than 16 characters."
    },
    'confirmPassword': {
      'required': "Confirm Password is required."
    },
    'passwordGroup': {
      'passwordMismatch': "Password and Confirm Password does not match."
    }
  }

  public formErrors = {
    'name': '',
    'username': '',
    'email': '',
    'password': '',
    'confirmPassword': '',
    'passwordGroup': ''
  };

  constructor(private _fb: FormBuilder, private _authService: AuthService) { }

  ngOnInit(): void {
    this._authService.getUser().subscribe(
      listEmployees => {
        this.users = listEmployees
      },
      err => console.log(err)
    );

    this.registerForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      email: ['', [Validators.required, CustomValidators.emailDomain('@gmail.com'), /*CustomValidators.availability(x)*/]],
      passwordGroup: this._fb.group({
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
        confirmPassword: ['', [Validators.required]],
      }, { validator: matchPassword })
    });

    this.registerForm.valueChanges.subscribe(() => {
      this.logValidationErrors(this.registerForm);
    })
  }

  logValidationErrors(group: FormGroup = this.registerForm): void {

    Object.keys(group.controls).forEach((key: string) => {

      const abstractControl = group.get(key);

      this.formErrors[key] = '';

      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')) {

        const messages = this.validationMessages[key];

        for (const errorKey in abstractControl.errors) {

          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    })

  }

  submitForm() {
    const data = this.registerForm.value;

    const user = {
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.passwordGroup.password
    };

    this._authService.addUser(user).subscribe(data => {

      if (data["success"] == true) {
        this.users.userList.push(user);
        alert("Registered Successfully");
        console.log("New User: ", data);
      } else if (data["error"]["success"] == false) {
        alert("Username already taken");
      }
    });
  }

}

function matchPassword(group: AbstractControl): { [key: string]: any } | null {
  const passwordControl = group.get('password');
  const confirmPasswordControl = group.get('confirmPassword');

  if (passwordControl.value === confirmPasswordControl.value || (confirmPasswordControl.pristine && confirmPasswordControl.value === '')) {
    return null;
  } else {
    return { 'passwordMismatch': true };
  }

}
