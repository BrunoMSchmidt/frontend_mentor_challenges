import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-columns-preview-card',
    templateUrl: './columns-preview-card.component.html',
    styleUrls: ['./columns-preview-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnsPreviewCardComponent {}
