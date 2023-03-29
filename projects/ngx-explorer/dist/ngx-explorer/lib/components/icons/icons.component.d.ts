import { INode } from 'ngx-explorer';
import { BehaviorSubject } from 'rxjs';
import { ExplorerService } from '../../services/explorer.service';
import { HelperService } from '../../services/helper.service';
import { BaseView } from '../base-view/base-view.directive';
export declare class IconsComponent extends BaseView {
    readonly icons: {
        node: string;
        leaf: string;
    };
    constructor(explorerService: ExplorerService, helperService: HelperService, filter: BehaviorSubject<string>);
    openner(event: MouseEvent, item: INode): void;
}
