import { AbstractControl } from '@angular/forms';

export class CustomValidators {

    //EMAIL VALIDATION
    static emailDomain(domainName: string) {
        return (control: AbstractControl): { [key: string]: any } | null => {

            const email: string = control.value;
            const domain = email.substring(email.lastIndexOf('@'));

            if (email === '' || domain.toLowerCase() === domainName.toLowerCase()) {
                return null;
            } else {
                return { 'emailDomain': true };
            }
        };
    }
    // END

    // static availability(listOfUsername) {
    //     const x = listOfUsername
    //     console.log(x)
    //     return (control: AbstractControl) => {
    //         const username: string = control.value;
    //         // console.log(listOfUsername)
    //         x.forEach(data => {
    //             if (username == data.username) {
    //                 return { 'exist': true };
    //             } else {
    //                 return null;
    //             }
    //         });

    //         if (email === '' || domain.toLowerCase() === domainName.toLowerCase()) {
    //             return null;
    //         } else {
    //             return { 'exist': true };
    //         }
    //     };
    // }
}
