import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private products = signal<Product[]>([]);
    private currentId = 1;

    getProducts() {
        return this.products;
    }

    addProduct(product: Omit<Product, 'id'>) {
        this.products.update(products => [...products, { ...product, id: this.currentId++ }]);
    }

    updateProduct(product: Product) {
        this.products.update(products => 
            products.map(p => p.id === product.id ? product : p)
        );
    }

    deleteProduct(id: number) {
        this.products.update(products => products.filter(p => p.id !== id));
    }
}