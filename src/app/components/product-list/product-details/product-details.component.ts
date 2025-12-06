import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product.model';

@Component({
    selector: 'app-product-details',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="modal-overlay" (click)="onClose()">
            <div class="modal-content" (click)="$event.stopPropagation()">
                <div class="modal-header">
                    <h2>Detalhes do Produto</h2>
                    <button class="close-button" (click)="onClose()">×</button>
                </div>
                
                <div class="product-info">
                    <div class="info-group">
                        <label>Nome:</label>
                        <p>{{ product.name }}</p>
                    </div>
                    
                    <div class="info-group">
                        <label>Nome Científico:</label>
                        <p>{{ product.scientificName }}</p>
                    </div>
                    
                    <div class="info-group">
                        <label>Status de Conservação:</label>
                        <p>{{ product.conservationStatus }}</p>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            width: 100%;
            max-width: 600px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;

            h2 {
                margin: 0;
                color: #333;
            }

            .close-button {
                background: none;
                border: none;
                font-size: 1.5rem;
                color: #666;
                cursor: pointer;
                padding: 0.5rem;
                line-height: 1;

                &:hover {
                    color: #333;
                }
            }
        }

        .product-info {
            .info-group {
                margin-bottom: 1.5rem;

                label {
                    display: block;
                    color: #666;
                    font-size: 0.9rem;
                    margin-bottom: 0.5rem;
                }

                p {
                    margin: 0;
                    color: #333;
                    font-size: 1.1rem;
                    padding: 0.5rem;
                    background-color: #f8f8f8;
                    border-radius: 4px;
                }
            }
        }
    `]
})
export class ProductDetailsComponent {
    @Input() product!: Product;
    @Output() close = new EventEmitter<void>();

    onClose() {
        this.close.emit();
    }
}