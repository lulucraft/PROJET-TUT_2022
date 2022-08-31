import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder, private router: Router, private dataService: DataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataService.getSizes().subscribe(sizes => {
      this.sizes = sizes;
    });

    this.activatedRoute.params.subscribe(obj => {
      let productId = obj['ID'];
      if (productId == -1) {
        // New product
      } else {4
        // Edit product
        this.dataService.getProduct(productId).subscribe(product => {
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
    let size = this.formGroup.controls['sizeCtrl'].value;
    let imageLink = this.formGroup.controls['imageLinkCtrl'].value;
    let imageFile = this.formGroup.controls['imageFileCtrl'].value;
    let price = this.formGroup.controls['priceCtrl'].value;
    let refund = this.formGroup.controls['refundCtrl'].value;
    let quantity = this.formGroup.controls['quantityCtrl'].value;

    this.dataService.sendProduct({
      id: -1,
      name: name,
      description: description,
      brand: brand,
      size: { label: size },
      price: price,
      stockQuantity: quantity,
      imageLink: imageLink,
      refund: refund,
    });
  }

  addSize(sizeLabel: string): void {
    if (sizeLabel.trim().length === 0) {
      return;
    }

    let size = this.sizes.find(s => s.label.trim() === sizeLabel.trim());
    if (size) {
      // Size already exists
      this.formGroup.controls['sizeCtrl'].setValue(size.id);
      return;
    }

    // Add new size
    sizeLabel = sizeLabel.trim();
    size = { id: this.sizes.length+1, label: sizeLabel };
    this.sizes.push(size);
    this.formGroup.controls['sizeCtrl'].setValue(size.id);
  }

}
