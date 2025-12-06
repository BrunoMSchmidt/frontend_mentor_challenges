import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [CommonModule, ProductFormComponent, ProductDetailsComponent],
    template: `
        <div class="product-list-container">
            <button class="add-button" (click)="showForm()">ADD</button>

            <table class="product-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Nome Científico</th>
                        <th>Status de Conservação</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let product of products()">
                        <td>{{ product.name }}</td>
                        <td>{{ product.scientificName }}</td>
                        <td>{{ product.conservationStatus }}</td>
                        <td class="actions">
                            <button class="details-button" (click)="openDetails(product)">DETALHES</button>
                            <button class="edit-button" (click)="onEdit(product)">EDIT</button>
                            <button class="delete-button" (click)="onDelete(product)">DELETE</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <app-product-form 
                *ngIf="showModal"
                [product]="selectedProduct"
                (save)="onSave($event)"
                (cancel)="hideForm()">
            </app-product-form>

            <app-product-details
                *ngIf="showDetails"
                [product]="selectedProduct!"
                (close)="hideDetails()">
            </app-product-details>
        </div>
    `,
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
    private productService = inject(ProductService);
    products = this.productService.getProducts();
    showModal = false;
    showDetails = false;
    selectedProduct: Product | null = null;

    showForm(product: Product | null = null) {
        this.selectedProduct = product;
        this.showModal = true;
    }

    openDetails(product: Product) {
        this.selectedProduct = product;
        this.showDetails = true;
    }

    hideDetails() {
        this.showDetails = false;
        this.selectedProduct = null;
    }

    hideForm() {
        this.showModal = false;
        this.selectedProduct = null;
    }

    onSave(productData: Omit<Product, 'id'>) {
        if (this.selectedProduct) {
            this.productService.updateProduct({
                ...productData,
                id: this.selectedProduct.id
            });
        } else {
            this.productService.addProduct(productData);
        }
        this.hideForm();
    }

    onEdit(product: Product) {
        this.showForm(product);
    }

    onDelete(product: Product) {
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            this.productService.deleteProduct(product.id);
        }
    }
}