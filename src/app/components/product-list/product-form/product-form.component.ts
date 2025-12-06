import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../models/product.model';

@Component({
    selector: 'app-product-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="modal-overlay" (click)="onCancel()">
            <div class="modal-content" (click)="$event.stopPropagation()">
                <h2>{{ product ? 'Editar Produto' : 'Novo Produto' }}</h2>
                
                <form (ngSubmit)="onSubmit()" #form="ngForm">
                    <div class="form-group">
                        <label for="name">Nome</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name"
                            [(ngModel)]="formData.name"
                            required
                            minlength="3"
                            #name="ngModel">
                        <div class="error" *ngIf="name.invalid && (name.dirty || name.touched)">
                            <span *ngIf="name.errors?.['required']">Nome é obrigatório</span>
                            <span *ngIf="name.errors?.['minlength']">Nome deve ter no mínimo 3 caracteres</span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="scientificName">Nome Científico</label>
                        <input 
                            type="text" 
                            id="scientificName" 
                            name="scientificName"
                            [(ngModel)]="formData.scientificName"
                            required
                            #scientificName="ngModel">
                        <div class="error" *ngIf="scientificName.invalid && (scientificName.dirty || scientificName.touched)">
                            <span *ngIf="scientificName.errors?.['required']">Nome científico é obrigatório</span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="conservationStatus">Status de Conservação</label>
                        <input 
                            type="text" 
                            id="conservationStatus" 
                            name="conservationStatus"
                            [(ngModel)]="formData.conservationStatus"
                            required
                            #conservationStatus="ngModel">
                        <div class="error" *ngIf="conservationStatus.invalid && (conservationStatus.dirty || conservationStatus.touched)">
                            <span *ngIf="conservationStatus.errors?.['required']">Status de conservação é obrigatório</span>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="button" class="btn-cancel" (click)="onCancel()">Cancelar</button>
                        <button type="submit" class="btn-submit" [disabled]="form.invalid">
                            {{ product ? 'Atualizar' : 'Adicionar' }}
                        </button>
                    </div>
                </form>
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
        }

        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            width: 100%;
            max-width: 500px;
        }

        h2 {
            margin-bottom: 1.5rem;
            color: #333;
        }

        .form-group {
            margin-bottom: 1rem;
        }

        label {
            display: block;
            margin-bottom: 0.5rem;
            color: #666;
        }

        input {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;

            &:focus {
                outline: none;
                border-color: #98D8AA;
            }
        }

        .error {
            color: #FF9B9B;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        }

        .form-actions {
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
            margin-top: 2rem;
        }

        button {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;

            &:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
        }

        .btn-cancel {
            background-color: #ddd;
            color: #666;

            &:hover {
                background-color: #ccc;
            }
        }

        .btn-submit {
            background-color: #98D8AA;
            color: white;

            &:hover:not(:disabled) {
                background-color: #7ac78e;
            }
        }
    `]
})
export class ProductFormComponent {
    @Input() product: Product | null = null;
    @Output() save = new EventEmitter<Omit<Product, 'id'>>();
    @Output() cancel = new EventEmitter<void>();

    formData: Omit<Product, 'id'> = {
        name: '',
        scientificName: '',
        conservationStatus: ''
    };

    ngOnInit() {
        if (this.product) {
            this.formData = {
                name: this.product.name,
                scientificName: this.product.scientificName,
                conservationStatus: this.product.conservationStatus
            };
        }
    }

    onSubmit() {
        this.save.emit(this.formData);
    }

    onCancel() {
        this.cancel.emit();
    }
}