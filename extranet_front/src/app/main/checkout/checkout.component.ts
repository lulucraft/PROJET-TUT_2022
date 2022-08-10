import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/models/country';
import { countries } from 'src/app/services/data.service';
import { loadScript, OnApproveActions, OnApproveData, OnCancelledActions, PayPalNamespace } from "@paypal/paypal-js";
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  @ViewChild('stepper') private stepper!: MatStepper;

  public countries: Country[] = [];

  public firstFormGroup: FormGroup = this.formBuilder.group({
    lastnameCtrl: ['', Validators.required],
    nameCtrl: ['', Validators.required],
    addressCtrl: ['', Validators.required],
    postalCodeCtrl: ['', Validators.required],
    cityCtrl: ['', Validators.required],
    countryCtrl: ['', Validators.required],
  });
  public secondFormGroup: FormGroup = this.formBuilder.group({});

  constructor(private formBuilder: FormBuilder, private router: Router) {
    loadScript({
      "client-id": "AaD_eArL3lImSsUm6EPqC1XPhS6TZ1wkNt7DEamO8lUUJw9xQ1gf-_qvW4iAeFu3VZsJR61-NN5Qo1AF",
      "currency": "EUR"
    })
      .then((paypal: PayPalNamespace | null) => {
        if (!paypal || !paypal.Buttons) {
          throw new Error("PayPal SDK not available");
        }

        paypal
          .Buttons({
            style: {
              layout: "vertical",
              color: "blue",
              shape: "rect",
              label: "paypal"
            },
            onApprove: (data: OnApproveData, actions: OnApproveActions) => {
              console.log("Transaction ID: " + data.paymentID);
              console.log("Payer ID: " + data.payerID);

              if (!actions) {
                throw new Error("No actions");
              }

              if (!actions.order) {
                throw new Error("No order");
              }

              console.log("Order: " + actions.order);

              return actions.order.capture().then((details: any) => {
                // alert("Transaction completed by " + details.payer.name.given_name);
                console.log(details);
                this.stepper.next();
              });
            },
            onCancel: (data: Record<string, unknown>, actions: OnCancelledActions) => {
              console.log("OnCancel", data, actions);
              // alert("Transaction cancelled");
            },
            onError: (err: any) => {
              console.error(err);
            }
          })
          .render('#paypal-button-container')
          .catch((err: any) => {
            console.error("Failed to render the PayPal Buttons", err);
          });
      })
      .catch((err: any) => {
        console.error("Failed to load the PayPal JS SDK script", err);
      });
  }

  ngOnInit(): void {
    this.countries = countries;

    // Set default country to France
    let country = this.countries.find(c => c.code === 'FR');
    if (country) {
      this.firstFormGroup.patchValue({
        countryCtrl: country
      });
      // this.firstFormGroup.controls['countryCtrl'].setValue(country);
    }
  }

  home(): void {
    this.router.navigate(['/']);
  }

}
