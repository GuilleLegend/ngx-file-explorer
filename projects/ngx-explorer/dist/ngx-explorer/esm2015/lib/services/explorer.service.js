import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Utils } from '../shared/utils';
import { DataService } from './data.service';
import * as i0 from "@angular/core";
import * as i1 from "./data.service";
export class ExplorerService {
    constructor(dataService) {
        this.dataService = dataService;
        this.internalTree = Utils.createNode();
        this.flatPointers = { [this.internalTree.id]: this.internalTree };
        this.selectedNodes$ = new BehaviorSubject([]);
        this.openedNode$ = new BehaviorSubject(undefined);
        this.breadcrumbs$ = new BehaviorSubject([]);
        this.tree$ = new BehaviorSubject(this.internalTree);
        this.selectedNodes = this.selectedNodes$.asObservable();
        this.openedNode = this.openedNode$.asObservable();
        this.breadcrumbs = this.breadcrumbs$.asObservable();
        this.tree = this.tree$.asObservable();
        this.openNode(this.internalTree.id);
    }
    selectNodes(nodes) {
        this.selectedNodes$.next(nodes);
    }
    openNode(id) {
        this.getNodeChildren(id).subscribe(() => {
            const parent = this.flatPointers[id];
            this.openedNode$.next(parent);
            const breadcrumbs = Utils.buildBreadcrumbs(this.flatPointers, parent);
            this.breadcrumbs$.next(breadcrumbs);
            this.selectedNodes$.next([]);
        });
    }
    expandNode(id) {
        this.getNodeChildren(id).subscribe();
    }
    createNode(name) {
        const parent = this.openedNode$.value;
        this.dataService.createNode(parent.data, name).subscribe(() => {
            this.refresh();
        });
    }
    refresh() {
        this.openNode(this.openedNode$.value.id);
    }
    rename(name) {
        const nodes = this.selectedNodes$.value;
        if (nodes.length > 1) {
            throw new Error('Multiple selection rename not supported');
        }
        if (nodes.length === 0) {
            throw new Error('Nothing selected to rename');
        }
        const node = nodes[0];
        if (node.isLeaf) {
            this.dataService.renameLeaf(node.data, name).subscribe(() => {
                this.refresh();
            });
        }
        else {
            this.dataService.renameNode(node.data, name).subscribe(() => {
                this.refresh();
            });
        }
    }
    remove() {
        const selection = this.selectedNodes$.value;
        if (selection.length === 0) {
            throw new Error('Nothing selected to remove');
        }
        const targets = selection.map(node => this.flatPointers[node.id]);
        const nodes = targets.filter(t => !t.isLeaf).map(data => data.data);
        const leafs = targets.filter(t => t.isLeaf).map(data => data.data);
        const sub1 = nodes.length ? this.dataService.deleteNodes(nodes) : of([]);
        const sub2 = leafs.length ? this.dataService.deleteLeafs(leafs) : of([]);
        forkJoin([sub1, sub2]).subscribe(() => {
            this.refresh();
        });
    }
    upload(files) {
        const node = this.openedNode$.value;
        this.dataService.uploadFiles(node.data, files).subscribe(() => {
            this.refresh();
        });
    }
    download() {
        const target = this.selectedNodes$.value[0];
        this.dataService.download(target.data).subscribe(() => {
            this.refresh();
        });
    }

    open() {
        const target = this.selectedNodes$.value[0];
        this.dataService.open(target.data).subscribe(() => {
            this.refresh();
        })
    }
    openLeaf(target) {
        this.dataService.open(target.data).subscribe(() => {
            this.refresh();
        })
    }

    share() {
        const target = this.selectedNodes$.value[0];
        this.dataService.share(target.data).subscribe(() => {
            this.refresh();
        })
    }

    getNodeChildren(id) {
        const parent = this.flatPointers[id];
        if (parent.isLeaf) {
            throw new Error('Cannot open leaf node');
        }
        return this.dataService
            .getNodeChildren(parent.data)
            .pipe(tap(({ leafs, nodes }) => {
            const newNodes = nodes.map(data => Utils.createNode(id, false, data));
            const newLeafs = leafs.map(data => Utils.createNode(id, true, data));
            const newChildren = newNodes.concat(newLeafs);
            const added = newChildren.filter(c => !parent.children.find(o => Utils.compareObjects(o.data, c.data)));
            const removed = parent.children.filter(o => !newChildren.find(c => Utils.compareObjects(o.data, c.data)));
            removed.forEach(c => {
                const index = parent.children.findIndex(o => o.id === c.id);
                parent.children.splice(index, 1);
                delete this.flatPointers[c.id];
            });
            added.forEach(c => {
                parent.children.push(c);
                this.flatPointers[c.id] = c;
            });
            parent.children.sort((a, b) => a.data.name.localeCompare(b.data.name));
            const nodeChildren = parent.children.filter(c => !c.isLeaf);
            const leafChildren = parent.children.filter(c => c.isLeaf);
            parent.children = nodeChildren.concat(leafChildren);
            this.tree$.next(this.internalTree);
        }));
    }
}
ExplorerService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ExplorerService_Factory() { return new ExplorerService(i0.ɵɵinject(i1.DataService)); }, token: ExplorerService, providedIn: "root" });
ExplorerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
ExplorerService.ctorParameters = () => [
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwbG9yZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9uZ3gtZXhwbG9yZXIvbmd4LWV4cGxvcmVyL3Byb2plY3RzL25neC1leHBsb3Jlci9zcmMvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZXhwbG9yZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBSzdDLE1BQU0sT0FBTyxlQUFlO0lBY3hCLFlBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBYnBDLGlCQUFZLEdBQUcsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xDLGlCQUFZLEdBQXNCLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV2RSxtQkFBYyxHQUFHLElBQUksZUFBZSxDQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELGdCQUFXLEdBQUcsSUFBSSxlQUFlLENBQVEsU0FBUyxDQUFDLENBQUM7UUFDcEQsaUJBQVksR0FBRyxJQUFJLGVBQWUsQ0FBVSxFQUFFLENBQUMsQ0FBQztRQUNoRCxVQUFLLEdBQUcsSUFBSSxlQUFlLENBQVEsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXZELGtCQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNuRCxlQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM3QyxnQkFBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDL0MsU0FBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFHN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTSxXQUFXLENBQUMsS0FBYztRQUM3QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRU0sUUFBUSxDQUFDLEVBQVU7UUFDdEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ3BDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUIsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDdEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sVUFBVSxDQUFDLEVBQVU7UUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRU0sVUFBVSxDQUFDLElBQVk7UUFDMUIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7UUFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQzFELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxPQUFPO1FBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRU0sTUFBTSxDQUFDLElBQVk7UUFDdEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUM7UUFDeEMsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7U0FDOUQ7UUFDRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztTQUNqRDtRQUVELE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDYixJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3hELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztTQUNOO2FBQU07WUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3hELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVNLE1BQU07UUFDVCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQztRQUM1QyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztTQUNqRDtRQUVELE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEUsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbkUsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6RSxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXpFLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDbEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLE1BQU0sQ0FBQyxLQUFhO1FBQ3ZCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUMxRCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sUUFBUTtRQUNYLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2xELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyxlQUFlLENBQUMsRUFBVTtRQUM5QixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztTQUM1QztRQUVELE9BQU8sSUFBSSxDQUFDLFdBQVc7YUFDbEIsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBb0IsRUFBRSxFQUFFO1lBQzdDLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN0RSxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckUsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM5QyxNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hHLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFMUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDaEIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDNUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDO1lBRUgsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDZCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3ZFLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUQsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDM0QsTUFBTSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRXBELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1osQ0FBQzs7OztZQXhJSixVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckI7OztZQUpRLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIGZvcmtKb2luLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSU5vZGUsIERpY3Rpb25hcnksIE5vZGVDb250ZW50IH0gZnJvbSAnLi4vc2hhcmVkL3R5cGVzJztcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vc2hhcmVkL3V0aWxzJztcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi9kYXRhLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEV4cGxvcmVyU2VydmljZSB7XG4gICAgcHJpdmF0ZSBpbnRlcm5hbFRyZWUgPSBVdGlscy5jcmVhdGVOb2RlKCk7XG4gICAgcHJpdmF0ZSBmbGF0UG9pbnRlcnM6IERpY3Rpb25hcnk8SU5vZGU+ID0geyBbdGhpcy5pbnRlcm5hbFRyZWUuaWRdOiB0aGlzLmludGVybmFsVHJlZSB9O1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBzZWxlY3RlZE5vZGVzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8SU5vZGVbXT4oW10pO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgb3BlbmVkTm9kZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PElOb2RlPih1bmRlZmluZWQpO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgYnJlYWRjcnVtYnMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxJTm9kZVtdPihbXSk7XG4gICAgcHJpdmF0ZSByZWFkb25seSB0cmVlJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8SU5vZGU+KHRoaXMuaW50ZXJuYWxUcmVlKTtcblxuICAgIHB1YmxpYyByZWFkb25seSBzZWxlY3RlZE5vZGVzID0gdGhpcy5zZWxlY3RlZE5vZGVzJC5hc09ic2VydmFibGUoKTtcbiAgICBwdWJsaWMgcmVhZG9ubHkgb3BlbmVkTm9kZSA9IHRoaXMub3BlbmVkTm9kZSQuYXNPYnNlcnZhYmxlKCk7XG4gICAgcHVibGljIHJlYWRvbmx5IGJyZWFkY3J1bWJzID0gdGhpcy5icmVhZGNydW1icyQuYXNPYnNlcnZhYmxlKCk7XG4gICAgcHVibGljIHJlYWRvbmx5IHRyZWUgPSB0aGlzLnRyZWUkLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5vcGVuTm9kZSh0aGlzLmludGVybmFsVHJlZS5pZCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNlbGVjdE5vZGVzKG5vZGVzOiBJTm9kZVtdKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWROb2RlcyQubmV4dChub2Rlcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG9wZW5Ob2RlKGlkOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5nZXROb2RlQ2hpbGRyZW4oaWQpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmZsYXRQb2ludGVyc1tpZF07XG4gICAgICAgICAgICB0aGlzLm9wZW5lZE5vZGUkLm5leHQocGFyZW50KTtcbiAgICAgICAgICAgIGNvbnN0IGJyZWFkY3J1bWJzID0gVXRpbHMuYnVpbGRCcmVhZGNydW1icyh0aGlzLmZsYXRQb2ludGVycywgcGFyZW50KTtcbiAgICAgICAgICAgIHRoaXMuYnJlYWRjcnVtYnMkLm5leHQoYnJlYWRjcnVtYnMpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE5vZGVzJC5uZXh0KFtdKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGV4cGFuZE5vZGUoaWQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLmdldE5vZGVDaGlsZHJlbihpZCkuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZU5vZGUobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMub3BlbmVkTm9kZSQudmFsdWU7XG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuY3JlYXRlTm9kZShwYXJlbnQuZGF0YSwgbmFtZSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy5vcGVuTm9kZSh0aGlzLm9wZW5lZE5vZGUkLnZhbHVlLmlkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVuYW1lKG5hbWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBub2RlcyA9IHRoaXMuc2VsZWN0ZWROb2RlcyQudmFsdWU7XG4gICAgICAgIGlmIChub2Rlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011bHRpcGxlIHNlbGVjdGlvbiByZW5hbWUgbm90IHN1cHBvcnRlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90aGluZyBzZWxlY3RlZCB0byByZW5hbWUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc1swXTtcbiAgICAgICAgaWYgKG5vZGUuaXNMZWFmKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLnJlbmFtZUxlYWYobm9kZS5kYXRhLCBuYW1lKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLnJlbmFtZU5vZGUobm9kZS5kYXRhLCBuYW1lKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlKCkge1xuICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGVkTm9kZXMkLnZhbHVlO1xuICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3RoaW5nIHNlbGVjdGVkIHRvIHJlbW92ZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGFyZ2V0cyA9IHNlbGVjdGlvbi5tYXAobm9kZSA9PiB0aGlzLmZsYXRQb2ludGVyc1tub2RlLmlkXSk7XG4gICAgICAgIGNvbnN0IG5vZGVzID0gdGFyZ2V0cy5maWx0ZXIodCA9PiAhdC5pc0xlYWYpLm1hcChkYXRhID0+IGRhdGEuZGF0YSk7XG4gICAgICAgIGNvbnN0IGxlYWZzID0gdGFyZ2V0cy5maWx0ZXIodCA9PiB0LmlzTGVhZikubWFwKGRhdGEgPT4gZGF0YS5kYXRhKTtcblxuICAgICAgICBjb25zdCBzdWIxID0gbm9kZXMubGVuZ3RoID8gdGhpcy5kYXRhU2VydmljZS5kZWxldGVOb2Rlcyhub2RlcykgOiBvZihbXSk7XG4gICAgICAgIGNvbnN0IHN1YjIgPSBsZWFmcy5sZW5ndGggPyB0aGlzLmRhdGFTZXJ2aWNlLmRlbGV0ZUxlYWZzKGxlYWZzKSA6IG9mKFtdKTtcblxuICAgICAgICBmb3JrSm9pbihbc3ViMSwgc3ViMl0pLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwbG9hZChmaWxlczogRmlsZVtdKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLm9wZW5lZE5vZGUkLnZhbHVlO1xuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLnVwbG9hZEZpbGVzKG5vZGUuZGF0YSwgZmlsZXMpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGRvd25sb2FkKCkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLnNlbGVjdGVkTm9kZXMkLnZhbHVlWzBdO1xuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmRvd25sb2FkKHRhcmdldC5kYXRhKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Tm9kZUNoaWxkcmVuKGlkOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5mbGF0UG9pbnRlcnNbaWRdO1xuICAgICAgICBpZiAocGFyZW50LmlzTGVhZikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3Qgb3BlbiBsZWFmIG5vZGUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlXG4gICAgICAgICAgICAuZ2V0Tm9kZUNoaWxkcmVuKHBhcmVudC5kYXRhKVxuICAgICAgICAgICAgLnBpcGUodGFwKCh7IGxlYWZzLCBub2RlcyB9OiBOb2RlQ29udGVudDxhbnk+KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3Tm9kZXMgPSBub2Rlcy5tYXAoZGF0YSA9PiBVdGlscy5jcmVhdGVOb2RlKGlkLCBmYWxzZSwgZGF0YSkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0xlYWZzID0gbGVhZnMubWFwKGRhdGEgPT4gVXRpbHMuY3JlYXRlTm9kZShpZCwgdHJ1ZSwgZGF0YSkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0NoaWxkcmVuID0gbmV3Tm9kZXMuY29uY2F0KG5ld0xlYWZzKTtcbiAgICAgICAgICAgICAgICBjb25zdCBhZGRlZCA9IG5ld0NoaWxkcmVuLmZpbHRlcihjID0+ICFwYXJlbnQuY2hpbGRyZW4uZmluZChvID0+IFV0aWxzLmNvbXBhcmVPYmplY3RzKG8uZGF0YSwgYy5kYXRhKSkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlbW92ZWQgPSBwYXJlbnQuY2hpbGRyZW4uZmlsdGVyKG8gPT4gIW5ld0NoaWxkcmVuLmZpbmQoYyA9PiBVdGlscy5jb21wYXJlT2JqZWN0cyhvLmRhdGEsIGMuZGF0YSkpKTtcblxuICAgICAgICAgICAgICAgIHJlbW92ZWQuZm9yRWFjaChjID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBwYXJlbnQuY2hpbGRyZW4uZmluZEluZGV4KG8gPT4gby5pZCA9PT0gYy5pZCk7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5mbGF0UG9pbnRlcnNbYy5pZF07XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBhZGRlZC5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaChjKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mbGF0UG9pbnRlcnNbYy5pZF0gPSBjO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcGFyZW50LmNoaWxkcmVuLnNvcnQoKGEsIGIpID0+IGEuZGF0YS5uYW1lLmxvY2FsZUNvbXBhcmUoYi5kYXRhLm5hbWUpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBub2RlQ2hpbGRyZW4gPSBwYXJlbnQuY2hpbGRyZW4uZmlsdGVyKGMgPT4gIWMuaXNMZWFmKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsZWFmQ2hpbGRyZW4gPSBwYXJlbnQuY2hpbGRyZW4uZmlsdGVyKGMgPT4gYy5pc0xlYWYpO1xuICAgICAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbiA9IG5vZGVDaGlsZHJlbi5jb25jYXQobGVhZkNoaWxkcmVuKTtcblxuICAgICAgICAgICAgICAgIHRoaXMudHJlZSQubmV4dCh0aGlzLmludGVybmFsVHJlZSk7XG4gICAgICAgICAgICB9KSk7XG4gICAgfVxuXG59XG4iXX0=