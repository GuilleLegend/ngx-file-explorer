import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FILTER_STRING } from '../../injection-tokens/tokens';
import { ExplorerService } from '../../services/explorer.service';
import { HelperService } from '../../services/helper.service';
import { BaseView } from '../base-view/base-view.directive';
import { INode } from 'ngx-explorer';

@Component({
  selector: 'nxe-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListComponent extends BaseView {

  public readonly icons = {
    node: 'nxe-folder',
    leaf: 'nxe-doc',
  };

  constructor(explorerService: ExplorerService, helperService: HelperService, @Inject(FILTER_STRING) filter: BehaviorSubject<string>) {
    super(explorerService, helperService, filter);
  }

  orderByName() {
    this.items.sort((a, b) => a.data?.name.localeCompare(b.data?.name));
  }

  orderBySize() {
    this.filteredItems.sort((a, b) => Number(this.getSize(a)) - Number(this.getSize(b)));
  }

  orderByDate() {
    this.filteredItems.sort((a, b) => new Date(this.getLastModified(a)).getTime() - new Date(this.getLastModified(b)).getTime());
  }

  openner(event: MouseEvent, item: INode) {
    if (item.isLeaf) {
      this.openLeaf(event, item);
    } else {
      this.open(event, item);
    }
  }

  rightClick(event: MouseEvent, item: INode) {
    super.select(event, item)
    this.dbClick(item);
  }

  select(event: MouseEvent, item: INode) {
    super.select(event, item)
    this.dbSelect(item)
  }

  emptySpaceClick() {
    super.emptySpaceClick()
    this.emptyClick()
  }
}
