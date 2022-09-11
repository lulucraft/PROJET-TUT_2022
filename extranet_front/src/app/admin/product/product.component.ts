import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Size } from 'src/app/models/size';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public formGroup: FormGroup = this.formBuilder.group({
    nameCtrl: [null, Validators.required],
    descriptionCtrl: [null],
    brandCtrl: [null, Validators.required],
    sizeCtrl: [null, Validators.required],
    imageLinkCtrl: [null],
    imageFileCtrl: [null],
    priceCtrl: [null, Validators.required],
    refundCtrl: [null],
    quantityCtrl: [null, Validators.required]
  });

  public sizes: Size[] = [];

  public productId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.dataService.getSizes().subscribe(sizes => {
      this.sizes = sizes;
    });

    this.activatedRoute.params.subscribe(obj => {
      this.productId = obj['ID'];
      if (this.productId == -1) {
        // New product
      } else {
        // Edit product
        this.dataService.getProduct(this.productId).subscribe(product => {
          this.formGroup.patchValue({
            nameCtrl: product.name,
            descriptionCtrl: product.description,
            brandCtrl: product.brand,
            sizeCtrl: product.size.id,
            imageLinkCtrl: product.imageLink,
            priceCtrl: product.price,
            refundCtrl: product.refund,
            quantityCtrl: product.stockQuantity,
          });
        });
      }
    });
  }

  back(): void {
    this.router.navigate(['/admin/products']);
  }

  sendProduct(): void {
    let name = this.formGroup.controls['nameCtrl'].value;
    let description = this.formGroup.controls['descriptionCtrl'].value;
    let brand = this.formGroup.controls['brandCtrl'].value;
    let sizeId = this.formGroup.controls['sizeCtrl'].value;
    let imageLink = this.formGroup.controls['imageLinkCtrl'].value;
    let imageFile = this.formGroup.controls['imageFileCtrl'].value;
    let price = this.formGroup.controls['priceCtrl'].value;
    let refund = this.formGroup.controls['refundCtrl'].value;
    let quantity = this.formGroup.controls['quantityCtrl'].value;

    let size = this.sizes.find(s => s.id === sizeId);
    if (!size) {
      alert("Erreur lors de la récupération de la taille du produit");
      return;
    }

    this.dataService.sendProduct({
      id: -1,
      name: name,
      description: description,
      brand: brand,
      size: { id: size.id, label: size.label },
      price: price,
      stockQuantity: quantity,
      imageLink: imageLink,
      refund: refund,
    });
  }

  addSize(sizeLabel: string): void {
    // Remove spaces
    sizeLabel = sizeLabel.trim();

    if (sizeLabel.length === 0) {
      this.snackBar.open('Taille invalide', '', { duration: 2000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['snack-bar-container', 'warn'] });
      return;
    }

    let size = this.sizes.find(s => s.label && s.label.trim() === sizeLabel);
    if (size) {
      // Size already exists
      this.formGroup.controls['sizeCtrl'].setValue(size.id);
      this.snackBar.open('Cette taille existe déjà', '', { duration: 2000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['snack-bar-container', 'warn'] });
      return;
    }

    // Add new size
    let id: number = 0;
    if (this.sizes.length > 0) {
      size = this.sizes[this.sizes.length - 1];
      if (size.id) id = size.id;
    }
    size = { id: (id + 1), label: sizeLabel };
    this.sizes.push(size);
    this.formGroup.controls['sizeCtrl'].setValue(size.id);
  }

  deleteProduct(): void {
    this.dataService.deleteProduct(this.productId);
  }

}
