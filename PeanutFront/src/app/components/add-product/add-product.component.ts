import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormGroupDirective, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../api/auth/auth.service';
import { ProductService } from '../../api/product/product.service';
import { Product } from '../../models/product';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  matcher = new MyErrorStateMatcher();

  productForm: FormGroup;
  _id = '';
  prodName = '';
  prodDesc = '';
  prodPrice = '';
  //prodImage = '';
  isLoadingResults = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private productService: ProductService) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'prodName' : [null, Validators.required],
      'prodDesc' : [null, Validators.required],
      'prodPrice' : [null, Validators.required],
      //'prodImage' : [null, Validators.required]
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.productService.addProducts(this.productForm.value)
      .subscribe(res => {
          this.router.navigate(['products']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  back() {
    this.router.navigate(['/products']);
  }
}