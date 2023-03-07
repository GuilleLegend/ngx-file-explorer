import { InjectionToken, ɵɵdefineInjectable, Injectable, ɵɵinject, Directive, Inject, Component, ViewEncapsulation, ViewChild, EventEmitter, Output, HostListener, NgModule } from '@angular/core';
import { BehaviorSubject, of, forkJoin, Subscription } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

var AvialableView;
(function (AvialableView) {
    AvialableView["List"] = "List";
    AvialableView["Icon"] = "Icon";
})(AvialableView || (AvialableView = {}));

const CURRENT_VIEW = new InjectionToken('CURRENT_VIEW', {
    providedIn: 'root',
    factory: () => new BehaviorSubject(AvialableView.Icon),
});
const FILTER_STRING = new InjectionToken('FILTER_STRING', {
    providedIn: 'root',
    factory: () => new BehaviorSubject(''),
});

class Utils {
    static createNode(parentId = 0, isLeaf = false, data) {
        const id = ++this.id;
        return {
            id,
            parentId,
            data,
            isLeaf,
            children: []
        };
    }
    static buildBreadcrumbs(flatPointers, node) {
        const pieces = [];
        let currentNode = node;
        while (true) {
            pieces.unshift(currentNode);
            if (currentNode.parentId) {
                currentNode = flatPointers[currentNode.parentId];
            }
            else {
                break;
            }
        }
        return pieces;
    }
    static compareObjects(a, b) {
        return JSON.stringify(a) === JSON.stringify(b);
    }
}
Utils.id = 0;

class DataService {
}
DataService.ɵprov = ɵɵdefineInjectable({ factory: function DataService_Factory() { return new DataService(); }, token: DataService, providedIn: "root" });
DataService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];

class ExplorerService {
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
ExplorerService.ɵprov = ɵɵdefineInjectable({ factory: function ExplorerService_Factory() { return new ExplorerService(ɵɵinject(DataService)); }, token: ExplorerService, providedIn: "root" });
ExplorerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
ExplorerService.ctorParameters = () => [
    { type: DataService }
];

class HelperService {
    getName(data) {
        return data === null || data === void 0 ? void 0 : data.name;
    }
}
HelperService.ɵprov = ɵɵdefineInjectable({ factory: function HelperService_Factory() { return new HelperService(); }, token: HelperService, providedIn: "root" });
HelperService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];

class BaseView {
    constructor(explorerService, helperService, filter) {
        this.explorerService = explorerService;
        this.helperService = helperService;
        this.filter = filter;
        this.selection = [];
        this.items = [];
        this.dragging = false;
        this.subs = new Subscription();
        this.subs.add(this.explorerService.openedNode.subscribe(nodes => {
            this.items = nodes ? nodes.children : [];
        }));
        this.subs.add(this.explorerService.selectedNodes.subscribe(nodes => {
            this.selection = nodes ? nodes : [];
        }));
    }
    get filteredItems() {
        const filter = this.filter.value;
        if (!filter) {
            return this.items;
        }
        return this.items.filter(i => this.helperService.getName(i.data).toLowerCase().includes(filter.toLowerCase()));
    }
    getDisplayName(data) {
        return this.helperService.getName(data);
    }
    select(event, item) {
        const selectedIndex = this.selection.findIndex(i => i === item);
        const alreadySelected = selectedIndex !== -1;
        const metaKeyPressed = event.metaKey || event.ctrlKey || event.shiftKey;
        if (alreadySelected && metaKeyPressed) {
            this.selection.splice(selectedIndex, 1);
        }
        else {
            if (!metaKeyPressed) {
                this.selection.length = 0;
            }
            this.selection.push(item);
        }
        this.explorerService.selectNodes(this.selection);
    }
    open(event, item) {
        const metaKeyPressed = event.metaKey || event.ctrlKey || event.shiftKey;
        if (!metaKeyPressed) {
            this.explorerService.openNode(item.id);
        }
    }
    isSelected(item) {
        return this.selection.indexOf(item) !== -1;
    }
    emptySpaceClick() {
        this.explorerService.selectNodes([]);
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
BaseView.decorators = [
    { type: Directive }
];
BaseView.ctorParameters = () => [
    { type: ExplorerService },
    { type: HelperService },
    { type: BehaviorSubject, decorators: [{ type: Inject, args: [FILTER_STRING,] }] }
];

class IconsComponent extends BaseView {
    constructor(explorerService, helperService, filter) {
        super(explorerService, helperService, filter);
        this.icons = {
            node: 'nxe-folder',
            leaf: 'nxe-doc',
        };
    }
}
IconsComponent.decorators = [
    { type: Component, args: [{
                selector: 'nxe-icons',
                template: "<div class=\"nxe-icons\" nxeDragDrop (dragging)=\"dragging = $event\">\n    <div class=\"nxe-icons-drag\" [ngClass]=\"{ dragging: dragging}\"></div>\n    <div class=\"nxe-icons-backpad\" (click)=\"emptySpaceClick()\"></div>\n    <div class=\"nxe-icons-container\">\n        <div class=\"nxe-icons-wrapper\" *ngFor=\"let item of filteredItems\" (dblclick)=\"open($event, item)\" (click)=\"select($event, item)\">\n            <div class=\"nxe-icons-wrapper-inner\" [ngClass]=\"{'nxe-icon-selected':isSelected(item)}\" [title]=\"getDisplayName(item.data)\">\n                <div class=\"nxe-icons-icon\">\n                    <i [className]=\"item.isLeaf ? icons.leaf : icons.node\"></i>\n                </div>\n                <div class=\"nxe-icon-text\">{{ getDisplayName(item.data) }}</div>\n            </div>\n        </div>\n    </div>\n</div>",
                encapsulation: ViewEncapsulation.None,
                styles: [".nxe-icons{height:100%;position:absolute;width:100%}.nxe-icons .nxe-icons-drag{bottom:2px;left:2px;position:absolute;right:2px;top:2px}.nxe-icons .nxe-icons-drag.dragging{border:2px dashed #30a2ff;margin:-2px}.nxe-icons .nxe-icons-backpad{height:100%;left:0;position:absolute;top:0;width:100%}.nxe-icons .nxe-icons-container{display:flex;flex-wrap:wrap}.nxe-icons .nxe-icons-container .nxe-icons-wrapper{display:inline-block;flex-grow:0;height:110px;margin:10px 10px 0;width:80px;z-index:1}.nxe-icons .nxe-icons-container .nxe-icons-wrapper .nxe-icons-wrapper-inner{border:1px solid transparent;border-radius:5px;padding-bottom:5px;text-align:center}.nxe-icons .nxe-icons-container .nxe-icons-wrapper .nxe-icons-wrapper-inner:hover{cursor:pointer}.nxe-icons .nxe-icons-container .nxe-icons-wrapper .nxe-icons-wrapper-inner .nxe-icons-icon{margin-top:5px}.nxe-icons .nxe-icons-container .nxe-icons-wrapper .nxe-icons-wrapper-inner .nxe-icons-icon i{color:#555;font-size:50px;font-weight:500}.nxe-icons .nxe-icons-container .nxe-icons-wrapper .nxe-icons-wrapper-inner .nxe-icons-icon i.nxe-folder{color:#fdb900}.nxe-icons .nxe-icons-container .nxe-icons-wrapper .nxe-icons-wrapper-inner .nxe-icons-icon i.nxe-doc{-webkit-text-stroke:3px #fff}.nxe-icons .nxe-icons-container .nxe-icons-wrapper .nxe-icons-wrapper-inner.nxe-icon-selected{background-color:#f1f9ff;border:1px solid #94cfff}.nxe-icons .nxe-icons-container .nxe-icons-wrapper .nxe-icons-wrapper-inner.nxe-icon-selected .nxe-icons-icon i.nxe-doc{-webkit-text-stroke:3px #f1f9ff}.nxe-icons .nxe-icons-container .nxe-icons-wrapper .nxe-icon-text{-webkit-box-orient:vertical;-webkit-line-clamp:3;display:-webkit-box;overflow:hidden;text-align:center;text-overflow:ellipsis}"]
            },] }
];
IconsComponent.ctorParameters = () => [
    { type: ExplorerService },
    { type: HelperService },
    { type: BehaviorSubject, decorators: [{ type: Inject, args: [FILTER_STRING,] }] }
];

class ExplorerComponent {
    constructor(currentView) {
        this.currentView = currentView;
        this.avialableView = AvialableView;
        this.sub = new Subscription();
        this.sub.add(this.currentView.subscribe(view => {
            this.view = view;
        }));
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
ExplorerComponent.decorators = [
    { type: Component, args: [{
                selector: 'nxe-explorer',
                template: "<div class=\"nxe-explorer\">\n    <div class=\"nxe-eplorer-menu\">\n        <nxe-menu-bar></nxe-menu-bar>\n    </div>\n    <div class=\"nxe-explorer-containers\">\n        <div class=\"nxe-explorer-left-container\">\n            <nxe-tree></nxe-tree>\n        </div>\n        <div class=\"nxe-explorer-right-container\">\n            <div class=\"nxe-explorer-right-menu\">\n                <nxe-second-menu-bar></nxe-second-menu-bar>\n            </div>\n            <div class=\"nxe-explorer-right-content\">\n                <ng-container *ngIf=\"view === avialableView.Icon\">\n                    <nxe-icons></nxe-icons>\n                </ng-container>\n                <ng-container *ngIf=\"view === avialableView.List\">\n                    <nxe-list></nxe-list>\n                </ng-container>\n            </div>\n        </div>\n    </div>\n</div> ",
                encapsulation: ViewEncapsulation.None,
                styles: [".nxe-explorer{border:1px solid #ccc;display:flex;flex-direction:column;height:100%}.nxe-eplorer-menu{border-bottom:1px solid #ccc}.nxe-explorer-containers{display:flex;flex-wrap:wrap;height:100%}.nxe-explorer-left-container{border-right:1px solid #ccc;flex-basis:20rem;flex-grow:1;overflow:auto;position:relative}.nxe-explorer-right-container{display:flex;flex-basis:0;flex-direction:column;flex-grow:999}.nxe-explorer-right-menu{border-bottom:1px solid #ccc}.nxe-explorer-right-content{flex-grow:1;overflow:auto;position:relative}"]
            },] }
];
ExplorerComponent.ctorParameters = () => [
    { type: BehaviorSubject, decorators: [{ type: Inject, args: [CURRENT_VIEW,] }] }
];

class MenuBarComponent {
    constructor(explorerService, helperService) {
        this.explorerService = explorerService;
        this.helperService = helperService;
        this.canDownload = false;
        this.canDelete = false;
        this.canRename = false;
        this.sub = new Subscription();
        this.selection = [];
        this.sub.add(this.explorerService.selectedNodes.subscribe(n => {
            this.selection = n;
            this.canDownload = n.filter(x => x.isLeaf).length === 1;
            this.canDelete = n.length > 0;
            this.canRename = n.length === 1;
        }));
    }
    createFolder() {
        const name = prompt('Enter new folder name');
        if (name) {
            this.explorerService.createNode(name);
        }
    }
    refresh() {
        this.explorerService.refresh();
    }
    rename() {
        if (this.selection.length === 1) {
            const oldName = this.helperService.getName(this.selection[0].data);
            const newName = prompt('Enter new name', oldName);
            if (newName) {
                this.explorerService.rename(newName);
            }
        }
    }
    remove() {
        if (confirm('Are you sure you want to delete the selected files?')) {
            this.explorerService.remove();
        }
    }
    openUploader() {
        this.uploader.nativeElement.click();
    }
    handleFiles(files) {
        this.explorerService.upload(files);
        this.uploader.nativeElement.value = '';
    }
    download() {
        this.explorerService.download();
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
MenuBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'nxe-menu-bar',
                template: "<div class=\"nxe-menu-bar\">\n    <div class=\"nxe-menu-bar-left\">    \n        <button class=\"nxe-menu-bar-button\" (click)=\"createFolder()\"><i class=\"nxe-folder\" aria-hidden=\"true\"></i>New Folder</button>\n        <button class=\"nxe-menu-bar-button\" (click)=\"refresh()\"><i class=\"nxe-arrows-cw\" aria-hidden=\"true\"></i> Refresh</button>\n        <button class=\"nxe-menu-bar-button\" (click)=\"openUploader()\"><i class=\"nxe-upload\" aria-hidden=\"true\"></i> Upload</button>\n        <button class=\"nxe-menu-bar-button\" [hidden]=\"!canDownload\" (click)=\"download()\"><i class=\"nxe-download\" aria-hidden=\"true\"></i> Download</button>\n        <button class=\"nxe-menu-bar-button\" [hidden]=\"!canRename\" (click)=\"rename()\"><i class=\"nxe-edit\" aria-hidden=\"true\"></i> Rename</button>\n        <button class=\"nxe-menu-bar-button\" [hidden]=\"!canDelete\" (click)=\"remove()\"><i class=\"nxe-trash-empty\" aria-hidden=\"true\"></i> Delete</button>\n    </div>\n\n    <div class=\"nxe-menu-bar-right\">\n        <nxe-view-switcher></nxe-view-switcher>\n    </div>\n    <input style=\"display: none\" type=\"file\" multiple (change)=\"handleFiles($event.target.files)\" #uploader>\n</div>",
                encapsulation: ViewEncapsulation.None,
                styles: [".nxe-menu-bar{display:flex}.nxe-menu-bar .nxe-menu-bar-left{flex-grow:1;padding:10px}.nxe-menu-bar .nxe-menu-bar-button{background:transparent;border:0;border-radius:5px;cursor:pointer;font-family:inherit;font-size:inherit;font-weight:inherit;margin-right:20px;padding:5px}.nxe-menu-bar .nxe-menu-bar-button .nxe-folder{color:#fdb900}.nxe-menu-bar .nxe-menu-bar-button .nxe-arrows-cw{color:green}.nxe-menu-bar .nxe-menu-bar-button .nxe-trash-empty{color:#ca0801}.nxe-menu-bar .nxe-menu-bar-button:hover{background-color:#d7edff}"]
            },] }
];
MenuBarComponent.ctorParameters = () => [
    { type: ExplorerService },
    { type: HelperService }
];
MenuBarComponent.propDecorators = {
    uploader: [{ type: ViewChild, args: ['uploader', { static: true },] }]
};

class ConfigProvider {
    constructor(config) {
        this.config = config;
    }
}

class BreadcrumbsComponent {
    constructor(explorerService, helperService, config) {
        this.explorerService = explorerService;
        this.helperService = helperService;
        this.config = config;
        this.breadcrumbs = [];
        this.sub = new Subscription();
        this.sub.add(this.explorerService.breadcrumbs.subscribe(n => this.buildBreadcrumbs(n)));
    }
    buildBreadcrumbs(nodes) {
        this.breadcrumbs = nodes.map(n => ({ name: this.helperService.getName(n.data) || this.config.config.homeNodeName, node: n }));
    }
    click(crumb) {
        this.explorerService.openNode(crumb.node.id);
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
BreadcrumbsComponent.decorators = [
    { type: Component, args: [{
                selector: 'nxe-breadcrumbs',
                template: "<div class=\"nxe-breadcrumbs\">\n    <span *ngFor=\"let crumb of breadcrumbs; last as last\">\n        <button (click)=\"click(crumb)\" class=\"nxe-breadcrumb-button\">{{ crumb.name }}</button>\n        <span *ngIf=\"!last\" class=\"nxe-breadcrumb-separator\">\n            <i class=\"nxe-angle-right\" aria-hidden=\"true\"></i>\n        </span>\n    </span>\n</div>",
                encapsulation: ViewEncapsulation.None,
                styles: [".nxe-breadcrumbs .nxe-breadcrumb-button{background:transparent;border:0;border-radius:5px;cursor:pointer;font-family:inherit;font-size:inherit;font-weight:inherit;padding:5px}.nxe-breadcrumbs .nxe-breadcrumb-button:hover{background-color:#d7edff}"]
            },] }
];
BreadcrumbsComponent.ctorParameters = () => [
    { type: ExplorerService },
    { type: HelperService },
    { type: ConfigProvider }
];

class ListComponent extends BaseView {
    constructor(explorerService, helperService, filter) {
        super(explorerService, helperService, filter);
        this.icons = {
            node: 'nxe-folder',
            leaf: 'nxe-doc',
        };
    }
}
ListComponent.decorators = [
    { type: Component, args: [{
                selector: 'nxe-list',
                template: "<div class=\"nxe-list\" nxeDragDrop (dragging)=\"dragging = $event\">\n    <div class=\"nxe-list-drag\" [ngClass]=\"{ dragging: dragging}\"></div>\n    <div class=\"nxe-list-backpad\" (click)=\"emptySpaceClick()\"></div>\n    <div class=\"nxe-list-container\">\n        <div class=\"nxe-list-wrapper \">\n            <table>\n                <thead>\n                    <tr>\n                        <th>Name</th>\n                        <th>Type</th>\n                        <th>Size</th>\n                        <th>Last Modified</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr *ngFor=\"let item of filteredItems\" (dblclick)=\"open($event, item)\" (click)=\"select($event, item)\"\n                        [ngClass]=\"{'nxe-list-row-selected':isSelected(item)}\">\n                        <td>\n                            <span class=\"nxe-list-icon\">\n                                <i [className]=\"item.isLeaf ? icons.leaf : icons.node\"></i>\n                            </span>\n                            {{ getDisplayName(item.data) }}\n                        </td>\n                        <td>{{ item.type }}</td>\n                        <td>{{ item.size }}</td>\n                        <td>{{ item.lastModified }}</td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>",
                encapsulation: ViewEncapsulation.None,
                styles: [".nxe-list{height:100%;position:absolute;width:100%}.nxe-list .nxe-list-drag{bottom:2px;left:2px;position:absolute;right:2px;top:2px;z-index:1}.nxe-list .nxe-list-drag.dragging{border:2px dashed #30a2ff;margin:-2px}.nxe-list .nxe-list-backpad{height:100%;left:0;position:absolute;top:0;width:100%}.nxe-list .nxe-list-container{display:flex;flex-wrap:wrap}.nxe-list .nxe-list-container .nxe-list-wrapper{display:inline-block;flex-grow:0;height:100%;width:100%;z-index:1}.nxe-list .nxe-list-container .nxe-list-wrapper table{border-collapse:collapse;border-spacing:0;width:100%}.nxe-list .nxe-list-container .nxe-list-wrapper table thead{border-bottom:1px solid #ccc}.nxe-list .nxe-list-container .nxe-list-wrapper table thead tr th{border-collapse:collapse;border-right:1px solid #ccc;border-spacing:0;font-weight:400;padding:10px;text-align:left}.nxe-list .nxe-list-container .nxe-list-wrapper table thead tr th:last-child{border-right:none}.nxe-list .nxe-list-container .nxe-list-wrapper table tbody tr:nth-child(2n){background-color:#f4f4f4}.nxe-list .nxe-list-container .nxe-list-wrapper table tbody tr.nxe-list-row-selected,.nxe-list .nxe-list-container .nxe-list-wrapper table tbody tr:hover{background-color:#d7edff}.nxe-list .nxe-list-container .nxe-list-wrapper table tbody tr td{padding:8px 10px}.nxe-list .nxe-list-container .nxe-list-wrapper table tbody tr td .nxe-list-icon{color:#555;margin-right:5px}.nxe-list .nxe-list-container .nxe-list-wrapper table tbody tr td .nxe-list-icon .nxe-folder{color:#fdb900}"]
            },] }
];
ListComponent.ctorParameters = () => [
    { type: ExplorerService },
    { type: HelperService },
    { type: BehaviorSubject, decorators: [{ type: Inject, args: [FILTER_STRING,] }] }
];

class SecondMenuBarComponent {
}
SecondMenuBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'nxe-second-menu-bar',
                template: "<div class=\"nxe-second-menu-bar\">\n    <div class=\"nxe-second-menu-bar-left\">\n        <nxe-breadcrumbs></nxe-breadcrumbs>\n    </div>\n    <div class=\"nxe-second-menu-bar-right\">\n        <nxe-filter></nxe-filter>\n    </div>\n</div>",
                encapsulation: ViewEncapsulation.None,
                styles: [".nxe-second-menu-bar{display:flex;padding:10px}.nxe-second-menu-bar .nxe-second-menu-bar-left{flex-grow:1}"]
            },] }
];

class ViewSwitcherComponent {
    constructor(currentView) {
        this.currentView = currentView;
        this.avialableView = AvialableView;
    }
    setView(view) {
        this.currentView.next(view);
    }
}
ViewSwitcherComponent.decorators = [
    { type: Component, args: [{
                selector: 'nxe-view-switcher',
                template: "<div class=\"nxe-view-switcher\">\n    <button (click)=\"setView(avialableView.Icon)\"><i class=\"nxe-th-large\" aria-hidden=\"true\"></i></button>\n    <button (click)=\"setView(avialableView.List)\"><i class=\"nxe-menu\" aria-hidden=\"true\"></i></button>\n</div>",
                encapsulation: ViewEncapsulation.None,
                styles: [".nxe-view-switcher{padding:10px}.nxe-view-switcher button{background:transparent;border:0;border-radius:5px;cursor:pointer;font-family:inherit;font-size:inherit;font-weight:inherit;padding:5px}.nxe-view-switcher button:hover{background-color:#d7edff}"]
            },] }
];
ViewSwitcherComponent.ctorParameters = () => [
    { type: BehaviorSubject, decorators: [{ type: Inject, args: [CURRENT_VIEW,] }] }
];

class TreeComponent {
    constructor(explorerService, helperService) {
        this.explorerService = explorerService;
        this.helperService = helperService;
        this.treeNodes = [];
        this.expandedIds = [];
        this.sub = new Subscription();
        this.sub.add(this.explorerService.tree.pipe(filter(x => !!x)).subscribe(node => {
            this.addExpandedNode(node.id); // always expand root
            this.treeNodes = this.buildTree(node).children;
        }));
    }
    open(node) {
        this.addExpandedNode(node.id);
        this.explorerService.openNode(node.id);
    }
    expand(node) {
        this.addExpandedNode(node.id);
        this.explorerService.expandNode(node.id);
    }
    collapse(node) {
        this.removeExpandedNode(node.id);
        let nodes;
        this.sub.add(this.explorerService.tree.pipe(filter(x => !!x)).subscribe(x => nodes = x));
        this.treeNodes = this.buildTree(nodes).children;
    }
    getName(node) {
        return this.helperService.getName(node);
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    buildTree(node) {
        const treeNode = {
            id: node.id,
            parentId: node.parentId,
            data: node.data,
            isLeaf: node.isLeaf,
            children: [],
            expanded: false
        };
        treeNode.expanded = this.expandedIds.indexOf(node.id) > -1;
        if (treeNode.expanded) {
            treeNode.children = node.children.filter(x => !x.isLeaf).map(x => this.buildTree(x));
        }
        return treeNode;
    }
    addExpandedNode(id) {
        const index = this.expandedIds.indexOf(id);
        if (index === -1) {
            this.expandedIds.push(id);
        }
    }
    removeExpandedNode(id) {
        const index = this.expandedIds.indexOf(id);
        this.expandedIds.splice(index, 1);
    }
}
TreeComponent.decorators = [
    { type: Component, args: [{
                selector: 'nxe-tree',
                template: "<div class=\"nxe-tree\">\n    <ng-container *ngTemplateOutlet=\"tree;context:{nodes:treeNodes}\">\n    </ng-container>\n</div>\n\n<ng-template #tree let-nodes=\"nodes\">\n    <ul *ngIf=\"nodes && nodes.length > 0\">\n        <li *ngFor=\"let node of nodes\">\n            <div class=\"chevron\" *ngIf=\"!node.expanded\" (click)=\"expand(node)\"><i class=\"nxe-angle-right\" aria-hidden=\"true\"></i></div>\n            <div class=\"chevron\" *ngIf=\"node.expanded\" (click)=\"collapse(node)\"><i class=\"nxe-angle-down\" aria-hidden=\"true\"></i></div>\n\n            <div class=\"item\" (dblclick)=\"open(node)\">\n                <div class=\"folder-icon\"><i class=\"nxe-folder\" aria-hidden=\"true\"></i></div>\n                <div class=\"grow\" [innerText]=\"getName(node.data)\"></div>\n                <!-- <div class=\"ellipsis-icon\"><i class=\"fa fa-ellipsis-v\" aria-hidden=\"true\"></i></div> -->\n                <div class=\"highlighter\"></div>\n            </div>\n\n            <ng-container *ngTemplateOutlet=\"tree;context:{nodes:node.children}\">\n            </ng-container>\n        </li>\n    </ul>\n</ng-template> ",
                encapsulation: ViewEncapsulation.None,
                styles: [".nxe-tree{position:absolute}.nxe-tree ul{list-style-position:inside;margin:0 0 0 20px;padding:0}.nxe-tree li{list-style-type:none;padding:0;position:relative}.nxe-tree .chevron{color:#333;cursor:pointer;font-size:1.3rem;left:-20px;position:absolute;text-align:center;top:1px;width:21px}.nxe-tree .item{border-radius:5px;cursor:pointer;display:flex;padding:5px}.nxe-tree .item .folder-icon{margin-right:5px}.nxe-tree .item .folder-icon i{color:#555;font-weight:500}.nxe-tree .item .folder-icon i.nxe-folder{color:#fdb900}.nxe-tree .item .grow{flex:1}.nxe-tree .item:hover{background-color:#d7edff}"]
            },] }
];
TreeComponent.ctorParameters = () => [
    { type: ExplorerService },
    { type: HelperService }
];

class FilterComponent {
    constructor(filter, explorerService) {
        this.filter = filter;
        this.sub = new Subscription();
        this.sub.add(explorerService.tree.subscribe(() => {
            this.clear();
        }));
    }
    onChange(e, value) {
        if (e.key === 'Escape') {
            this.input.nativeElement.value = '';
            this.filter.next('');
            return;
        }
        this.filter.next(value.trim());
    }
    clear() {
        if (!this.input) {
            return;
        }
        this.input.nativeElement.value = '';
        this.filter.next('');
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
FilterComponent.decorators = [
    { type: Component, args: [{
                selector: 'nxe-filter',
                template: "<div class=\"nxe-filter\">\n    <input class=\"nxe-filter-input\" type=\"text\" #input (keyup)=\"onChange($event, input.value)\">\n    <button class=\"nxe-filter-button\" (click)=\"clear()\"><i class=\"nxe-cancel\" aria-hidden=\"true\"></i></button>\n</div>",
                styles: [".nxe-filter .nxe-filter-input{border:1px solid #ccc;font-size:1rem;font-weight:300;padding:.25rem}.nxe-filter .nxe-filter-button{background:transparent;border:0;border-radius:5px;cursor:pointer;font-family:inherit;font-size:inherit;font-weight:inherit;margin-left:5px;padding:5px 2px 5px 5px}.nxe-filter .nxe-filter-button:hover{background-color:#d7edff}"]
            },] }
];
FilterComponent.ctorParameters = () => [
    { type: BehaviorSubject, decorators: [{ type: Inject, args: [FILTER_STRING,] }] },
    { type: ExplorerService }
];
FilterComponent.propDecorators = {
    input: [{ type: ViewChild, args: ['input',] }]
};

class DragDropDirective {
    constructor(explorerService) {
        this.explorerService = explorerService;
        this.dragEnter = new EventEmitter();
        this.dragOver = new EventEmitter();
        this.dragLeave = new EventEmitter();
        this.dragDrop = new EventEmitter();
        this.dragging = new EventEmitter();
    }
    onDragEnter(event) {
        event.preventDefault();
        event.stopPropagation();
        this.dragEnter.emit(event);
        this.dragging.emit(true);
    }
    onDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
        this.dragOver.emit(event);
        this.dragging.emit(true);
    }
    onDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();
        this.dragLeave.emit(event);
        this.dragging.emit(false);
    }
    onDrop(event) {
        event.preventDefault();
        event.stopPropagation();
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            this.explorerService.upload(files);
            this.dragDrop.emit(files);
        }
        this.dragging.emit(false);
    }
}
DragDropDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nxeDragDrop]'
            },] }
];
DragDropDirective.ctorParameters = () => [
    { type: ExplorerService }
];
DragDropDirective.propDecorators = {
    dragEnter: [{ type: Output }],
    dragOver: [{ type: Output }],
    dragLeave: [{ type: Output }],
    dragDrop: [{ type: Output }],
    dragging: [{ type: Output }],
    onDragEnter: [{ type: HostListener, args: ['dragenter', ['$event'],] }],
    onDragOver: [{ type: HostListener, args: ['dragover', ['$event'],] }],
    onDragLeave: [{ type: HostListener, args: ['dragleave', ['$event'],] }],
    onDrop: [{ type: HostListener, args: ['drop', ['$event'],] }]
};

const Config = {
    homeNodeName: 'Files'
};

const ɵ0 = Config;
class NgxExplorerModule {
}
NgxExplorerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    IconsComponent,
                    ExplorerComponent,
                    MenuBarComponent,
                    BreadcrumbsComponent,
                    ListComponent,
                    SecondMenuBarComponent,
                    ViewSwitcherComponent,
                    TreeComponent,
                    FilterComponent,
                    DragDropDirective,
                ],
                imports: [
                    CommonModule
                ],
                exports: [
                    IconsComponent,
                    ExplorerComponent,
                    MenuBarComponent,
                    BreadcrumbsComponent,
                    ListComponent,
                    SecondMenuBarComponent,
                    ViewSwitcherComponent,
                    TreeComponent,
                    FilterComponent
                ],
                providers: [
                    {
                        provide: Config,
                        useValue: ɵ0
                    }
                ]
            },] }
];

/*
 * Public API Surface of ngx-explorer
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AvialableView, BaseView, BreadcrumbsComponent, CURRENT_VIEW, Config, ConfigProvider, DataService, ExplorerComponent, ExplorerService, FILTER_STRING, FilterComponent, HelperService, IconsComponent, ListComponent, MenuBarComponent, NgxExplorerModule, SecondMenuBarComponent, TreeComponent, Utils, ViewSwitcherComponent, ɵ0, DragDropDirective as ɵa };
//# sourceMappingURL=ngx-explorer.js.map
