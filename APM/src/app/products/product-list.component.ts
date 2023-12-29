import { Component, OnDestroy, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";
import { Subscription } from "rxjs";

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['product-list.component.css'],
})

export class ProductListComponent implements OnInit, OnDestroy {

  constructor(private productService: ProductService) { }

  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string = ""
  sub!: Subscription;
  private _listFilter: string = "";


  public get listFilter(): string {
    return this._listFilter;
  }

  public set listFilter(v: string) {
    this._listFilter = v;
    console.log("changed values")
    this.filteredProducts = this.performFilter(v)
  }
  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  toggleImage(): void {
    this.showImage = !this.showImage;
  }
  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase()
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().includes(filterBy));
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }
}