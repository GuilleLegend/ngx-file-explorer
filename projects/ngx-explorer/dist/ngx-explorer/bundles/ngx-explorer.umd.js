(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-explorer', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/common'], factory) :
    (global = global || self, factory(global['ngx-explorer'] = {}, global.ng.core, global.rxjs, global.rxjs.operators, global.ng.common));
}(this, (function (exports, i0, rxjs, operators, common) { 'use strict';

    (function (AvialableView) {
        AvialableView["List"] = "List";
        AvialableView["Icon"] = "Icon";
    })(exports.AvialableView || (exports.AvialableView = {}));

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var CURRENT_VIEW = new i0.InjectionToken('CURRENT_VIEW', {
        providedIn: 'root',
        factory: function () { return new rxjs.BehaviorSubject(exports.AvialableView.Icon); },
    });
    var FILTER_STRING = new i0.InjectionToken('FILTER_STRING', {
        providedIn: 'root',
        factory: function () { return new rxjs.BehaviorSubject(''); },
    });

    var Utils = /** @class */ (function () {
        function Utils() {
        }
        Utils.createNode = function (parentId, isLeaf, data) {
            if (parentId === void 0) { parentId = 0; }
            if (isLeaf === void 0) { isLeaf = false; }
            var id = ++this.id;
            return {
                id: id,
                parentId: parentId,
                data: data,
                isLeaf: isLeaf,
                children: []
            };
        };
        Utils.buildBreadcrumbs = function (flatPointers, node) {
            var pieces = [];
            var currentNode = node;
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
        };
        Utils.compareObjects = function (a, b) {
            return JSON.stringify(a) === JSON.stringify(b);
        };
        return Utils;
    }());
    Utils.id = 0;

    var DataService = /** @class */ (function () {
        function DataService() {
        }
        return DataService;
    }());
    DataService.ɵprov = i0.ɵɵdefineInjectable({ factory: function DataService_Factory() { return new DataService(); }, token: DataService, providedIn: "root" });
    DataService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];

    var ExplorerService = /** @class */ (function () {
        function ExplorerService(dataService) {
            var _a;
            this.dataService = dataService;
            this.internalTree = Utils.createNode();
            this.flatPointers = (_a = {}, _a[this.internalTree.id] = this.internalTree, _a);
            this.selectedNodes$ = new rxjs.BehaviorSubject([]);
            this.openedNode$ = new rxjs.BehaviorSubject(undefined);
            this.breadcrumbs$ = new rxjs.BehaviorSubject([]);
            this.tree$ = new rxjs.BehaviorSubject(this.internalTree);
            this.selectedNodes = this.selectedNodes$.asObservable();
            this.openedNode = this.openedNode$.asObservable();
            this.breadcrumbs = this.breadcrumbs$.asObservable();
            this.tree = this.tree$.asObservable();
            this.openNode(this.internalTree.id);
        }
        ExplorerService.prototype.selectNodes = function (nodes) {
            this.selectedNodes$.next(nodes);
        };
        ExplorerService.prototype.openNode = function (id) {
            var _this = this;
            this.getNodeChildren(id).subscribe(function () {
                var parent = _this.flatPointers[id];
                _this.openedNode$.next(parent);
                var breadcrumbs = Utils.buildBreadcrumbs(_this.flatPointers, parent);
                _this.breadcrumbs$.next(breadcrumbs);
                _this.selectedNodes$.next([]);
            });
        };
        ExplorerService.prototype.expandNode = function (id) {
            this.getNodeChildren(id).subscribe();
        };
        ExplorerService.prototype.createNode = function (name) {
            var _this = this;
            var parent = this.openedNode$.value;
            this.dataService.createNode(parent.data, name).subscribe(function () {
                _this.refresh();
            });
        };
        ExplorerService.prototype.refresh = function () {
            this.openNode(this.openedNode$.value.id);
        };
        ExplorerService.prototype.rename = function (name) {
            var _this = this;
            var nodes = this.selectedNodes$.value;
            if (nodes.length > 1) {
                throw new Error('Multiple selection rename not supported');
            }
            if (nodes.length === 0) {
                throw new Error('Nothing selected to rename');
            }
            var node = nodes[0];
            if (node.isLeaf) {
                this.dataService.renameLeaf(node.data, name).subscribe(function () {
                    _this.refresh();
                });
            }
            else {
                this.dataService.renameNode(node.data, name).subscribe(function () {
                    _this.refresh();
                });
            }
        };
        ExplorerService.prototype.remove = function () {
            var _this = this;
            var selection = this.selectedNodes$.value;
            if (selection.length === 0) {
                throw new Error('Nothing selected to remove');
            }
            var targets = selection.map(function (node) { return _this.flatPointers[node.id]; });
            var nodes = targets.filter(function (t) { return !t.isLeaf; }).map(function (data) { return data.data; });
            var leafs = targets.filter(function (t) { return t.isLeaf; }).map(function (data) { return data.data; });
            var sub1 = nodes.length ? this.dataService.deleteNodes(nodes) : rxjs.of([]);
            var sub2 = leafs.length ? this.dataService.deleteLeafs(leafs) : rxjs.of([]);
            rxjs.forkJoin([sub1, sub2]).subscribe(function () {
                _this.refresh();
            });
        };
        ExplorerService.prototype.upload = function (files) {
            var _this = this;
            var node = this.openedNode$.value;
            this.dataService.uploadFiles(node.data, files).subscribe(function () {
                _this.refresh();
            });
        };
        ExplorerService.prototype.download = function () {
            var _this = this;
            var target = this.selectedNodes$.value[0];
            this.dataService.download(target.data).subscribe(function () {
                _this.refresh();
            });
        };
        ExplorerService.prototype.getNodeChildren = function (id) {
            var _this = this;
            var parent = this.flatPointers[id];
            if (parent.isLeaf) {
                throw new Error('Cannot open leaf node');
            }
            return this.dataService
                .getNodeChildren(parent.data)
                .pipe(operators.tap(function (_a) {
                var leafs = _a.leafs, nodes = _a.nodes;
                var newNodes = nodes.map(function (data) { return Utils.createNode(id, false, data); });
                var newLeafs = leafs.map(function (data) { return Utils.createNode(id, true, data); });
                var newChildren = newNodes.concat(newLeafs);
                var added = newChildren.filter(function (c) { return !parent.children.find(function (o) { return Utils.compareObjects(o.data, c.data); }); });
                var removed = parent.children.filter(function (o) { return !newChildren.find(function (c) { return Utils.compareObjects(o.data, c.data); }); });
                removed.forEach(function (c) {
                    var index = parent.children.findIndex(function (o) { return o.id === c.id; });
                    parent.children.splice(index, 1);
                    delete _this.flatPointers[c.id];
                });
                added.forEach(function (c) {
                    parent.children.push(c);
                    _this.flatPointers[c.id] = c;
                });
                parent.children.sort(function (a, b) { return a.data.name.localeCompare(b.data.name); });
                var nodeChildren = parent.children.filter(function (c) { return !c.isLeaf; });
                var leafChildren = parent.children.filter(function (c) { return c.isLeaf; });
                parent.children = nodeChildren.concat(leafChildren);
                _this.tree$.next(_this.internalTree);
            }));
        };
        return ExplorerService;
    }());
    ExplorerService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ExplorerService_Factory() { return new ExplorerService(i0.ɵɵinject(DataService)); }, token: ExplorerService, providedIn: "root" });
    ExplorerService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    ExplorerService.ctorParameters = function () { return [
        { type: DataService }
    ]; };

    var HelperService = /** @class */ (function () {
        function HelperService() {
        }
        HelperService.prototype.getName = function (data) {
            return data === null || data === void 0 ? void 0 : data.name;
        };
        return HelperService;
    }());
    HelperService.ɵprov = i0.ɵɵdefineInjectable({ factory: function HelperService_Factory() { return new HelperService(); }, token: HelperService, providedIn: "root" });
    HelperService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];

    var BaseView = /** @class */ (function () {
        function BaseView(explorerService, helperService, filter) {
            var _this = this;
            this.explorerService = explorerService;
            this.helperService = helperService;
            this.filter = filter;
            this.selection = [];
            this.items = [];
            this.dragging = false;
            this.subs = new rxjs.Subscription();
            this.subs.add(this.explorerService.openedNode.subscribe(function (nodes) {
                _this.items = nodes ? nodes.children : [];
            }));
            this.subs.add(this.explorerService.selectedNodes.subscribe(function (nodes) {
                _this.selection = nodes ? nodes : [];
            }));
        }
        Object.defineProperty(BaseView.prototype, "filteredItems", {
            get: function () {
                var _this = this;
                var filter = this.filter.value;
                if (!filter) {
                    return this.items;
                }
                return this.items.filter(function (i) { return _this.helperService.getName(i.data).toLowerCase().includes(filter.toLowerCase()); });
            },
            enumerable: false,
            configurable: true
        });
        BaseView.prototype.getDisplayName = function (data) {
            return this.helperService.getName(data);
        };
        BaseView.prototype.select = function (event, item) {
            var selectedIndex = this.selection.findIndex(function (i) { return i === item; });
            var alreadySelected = selectedIndex !== -1;
            var metaKeyPressed = event.metaKey || event.ctrlKey || event.shiftKey;
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
        };
        BaseView.prototype.open = function (event, item) {
            var metaKeyPressed = event.metaKey || event.ctrlKey || event.shiftKey;
            if (!metaKeyPressed) {
                this.explorerService.openNode(item.id);
            }
        };
        BaseView.prototype.isSelected = function (item) {
            return this.selection.indexOf(item) !== -1;
        };
        BaseView.prototype.emptySpaceClick = function () {
            this.explorerService.selectNodes([]);
        };
        BaseView.prototype.ngOnDestroy = function () {
            this.subs.unsubscribe();
        };
        return BaseView;
    }());
    BaseView.decorators = [
        { type: i0.Directive }
    ];
    BaseView.ctorParameters = function () { return [
        { type: ExplorerService },
        { type: HelperService },
        { type: rxjs.BehaviorSubject, decorators: [{ type: i0.Inject, args: [FILTER_STRING,] }] }
    ]; };

    var IconsComponent = /** @class */ (function (_super) {
        __extends(IconsComponent, _super);
        function IconsComponent(explorerService, helperService, filter) {
            var _this = _super.call(this, explorerService, helperService, filter) || this;
            _this.icons = {
                node: 'nxe-folder',
                leaf: 'nxe-doc',
            };
            return _this;
        }
        return IconsComponent;
    }(BaseView));
    IconsComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'nxe-icons',
                    template: "<div class=\"nxe-icons\" nxeDragDrop (dragging)=\"dragging = $event\">\n    <div class=\"nxe-icons-drag\" [ngClass]=\"{ dragging: dragging}\"></div>\n    <div class=\"nxe-icons-backpad\" (click)=\"emptySpaceClick()\"></div>\n    <div class=\"nxe-icons-container\">\n        <div class=\"nxe-icons-wrapper\" *ngFor=\"let item of filteredItems\" (dblclick)=\"open($event, item)\" (click)=\"select($event, item)\">\n            <div class=\"nxe-icons-wrapper-inner\" [ngClass]=\"{'nxe-icon-selected':isSelected(item)}\" [title]=\"getDisplayName(item.data)\">\n                <div class=\"nxe-icons-icon\">\n                    <i [className]=\"item.isLeaf ? icons.leaf : icons.node\"></i>\n                </div>\n                <div class=\"nxe-icon-text\">{{ getDisplayName(item.data) }}</div>\n            </div>\n        </div>\n    </div>\n</div>",
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: [".nxe-icons{height:100%;position:absolute;width:100%}.nxe-icons .nxe-icons-drag{bottom:2px;left:2px;position:absolute;right:2px;top:2px}.nxe-icons .nxe-icons-drag.dragging{border:2px dashed #30a2ff;margin:-2px}.nxe-icons .nxe-icons-backpad{height:100%;left:0;position:absolute;top:0;width:100%}.nxe-icons .nxe-icons-container{display:flex;flex-wrap:wrap}.nxe-icons .nxe-icons-container .nxe-icons-wrapper{display:inline-block;flex-grow:0;height:110px;margin:10px 10px 0;width:80px;z-index:1}.nxe-icons .nxe-icons-container .nxe-icons-wrapper .nxe-icons-wrapper-inner{border:1px solid transparent;border-radius:5px;padding-bottom:5px;text-align:center}.nxe-icons .nxe-icons-container .nxe-icons-wrapper .nxe-icons-wrapper-inner:hover{cursor:pointer}.nxe-icons .nxe-icons-container .nxe-icons-wrapper .nxe-icons-wrapper-inner .nxe-icons-icon{margin-top:5px}.nxe-icons .nxe-icons-container .nxe-icons-wrapper .nxe-icons-wrapper-inner .nxe-icons-icon i{color:#555;font-size:50px;font-weight:500}.nxe-icons .nxe-icons-container .nxe-icons-wrapper .nxe-icons-wrapper-inner .nxe-icons-icon i.nxe-folder{color:#fdb900}.nxe-icons .nxe-icons-container .nxe-icons-wrapper .nxe-icons-wrapper-inner .nxe-icons-icon i.nxe-doc{-webkit-text-stroke:3px #fff}.nxe-icons .nxe-icons-container .nxe-icons-wrapper .nxe-icons-wrapper-inner.nxe-icon-selected{background-color:#f1f9ff;border:1px solid #94cfff}.nxe-icons .nxe-icons-container .nxe-icons-wrapper .nxe-icons-wrapper-inner.nxe-icon-selected .nxe-icons-icon i.nxe-doc{-webkit-text-stroke:3px #f1f9ff}.nxe-icons .nxe-icons-container .nxe-icons-wrapper .nxe-icon-text{-webkit-box-orient:vertical;-webkit-line-clamp:3;display:-webkit-box;overflow:hidden;text-align:center;text-overflow:ellipsis}"]
                },] }
    ];
    IconsComponent.ctorParameters = function () { return [
        { type: ExplorerService },
        { type: HelperService },
        { type: rxjs.BehaviorSubject, decorators: [{ type: i0.Inject, args: [FILTER_STRING,] }] }
    ]; };

    var ExplorerComponent = /** @class */ (function () {
        function ExplorerComponent(currentView) {
            var _this = this;
            this.currentView = currentView;
            this.avialableView = exports.AvialableView;
            this.sub = new rxjs.Subscription();
            this.sub.add(this.currentView.subscribe(function (view) {
                _this.view = view;
            }));
        }
        ExplorerComponent.prototype.ngOnDestroy = function () {
            this.sub.unsubscribe();
        };
        return ExplorerComponent;
    }());
    ExplorerComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'nxe-explorer',
                    template: "<div class=\"nxe-explorer\">\n    <div class=\"nxe-eplorer-menu\">\n        <nxe-menu-bar></nxe-menu-bar>\n    </div>\n    <div class=\"nxe-explorer-containers\">\n        <div class=\"nxe-explorer-left-container\">\n            <nxe-tree></nxe-tree>\n        </div>\n        <div class=\"nxe-explorer-right-container\">\n            <div class=\"nxe-explorer-right-menu\">\n                <nxe-second-menu-bar></nxe-second-menu-bar>\n            </div>\n            <div class=\"nxe-explorer-right-content\">\n                <ng-container *ngIf=\"view === avialableView.Icon\">\n                    <nxe-icons></nxe-icons>\n                </ng-container>\n                <ng-container *ngIf=\"view === avialableView.List\">\n                    <nxe-list></nxe-list>\n                </ng-container>\n            </div>\n        </div>\n    </div>\n</div> ",
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: [".nxe-explorer{border:1px solid #ccc;display:flex;flex-direction:column;height:100%}.nxe-eplorer-menu{border-bottom:1px solid #ccc}.nxe-explorer-containers{display:flex;flex-wrap:wrap;height:100%}.nxe-explorer-left-container{border-right:1px solid #ccc;flex-basis:20rem;flex-grow:1;overflow:auto;position:relative}.nxe-explorer-right-container{display:flex;flex-basis:0;flex-direction:column;flex-grow:999}.nxe-explorer-right-menu{border-bottom:1px solid #ccc}.nxe-explorer-right-content{flex-grow:1;overflow:auto;position:relative}"]
                },] }
    ];
    ExplorerComponent.ctorParameters = function () { return [
        { type: rxjs.BehaviorSubject, decorators: [{ type: i0.Inject, args: [CURRENT_VIEW,] }] }
    ]; };

    var MenuBarComponent = /** @class */ (function () {
        function MenuBarComponent(explorerService, helperService) {
            var _this = this;
            this.explorerService = explorerService;
            this.helperService = helperService;
            this.canDownload = false;
            this.canDelete = false;
            this.canRename = false;
            this.sub = new rxjs.Subscription();
            this.selection = [];
            this.sub.add(this.explorerService.selectedNodes.subscribe(function (n) {
                _this.selection = n;
                _this.canDownload = n.filter(function (x) { return x.isLeaf; }).length === 1;
                _this.canDelete = n.length > 0;
                _this.canRename = n.length === 1;
            }));
        }
        MenuBarComponent.prototype.createFolder = function () {
            var name = prompt('Enter new folder name');
            if (name) {
                this.explorerService.createNode(name);
            }
        };
        MenuBarComponent.prototype.refresh = function () {
            this.explorerService.refresh();
        };
        MenuBarComponent.prototype.rename = function () {
            if (this.selection.length === 1) {
                var oldName = this.helperService.getName(this.selection[0].data);
                var newName = prompt('Enter new name', oldName);
                if (newName) {
                    this.explorerService.rename(newName);
                }
            }
        };
        MenuBarComponent.prototype.remove = function () {
            if (confirm('Are you sure you want to delete the selected files?')) {
                this.explorerService.remove();
            }
        };
        MenuBarComponent.prototype.openUploader = function () {
            this.uploader.nativeElement.click();
        };
        MenuBarComponent.prototype.handleFiles = function (files) {
            this.explorerService.upload(files);
            this.uploader.nativeElement.value = '';
        };
        MenuBarComponent.prototype.download = function () {
            this.explorerService.download();
        };
        MenuBarComponent.prototype.ngOnDestroy = function () {
            this.sub.unsubscribe();
        };
        return MenuBarComponent;
    }());
    MenuBarComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'nxe-menu-bar',
                    template: "<div class=\"nxe-menu-bar\">\n    <div class=\"nxe-menu-bar-left\">    \n        <button class=\"nxe-menu-bar-button\" (click)=\"createFolder()\"><i class=\"nxe-folder\" aria-hidden=\"true\"></i>New Folder</button>\n        <button class=\"nxe-menu-bar-button\" (click)=\"refresh()\"><i class=\"nxe-arrows-cw\" aria-hidden=\"true\"></i> Refresh</button>\n        <button class=\"nxe-menu-bar-button\" (click)=\"openUploader()\"><i class=\"nxe-upload\" aria-hidden=\"true\"></i> Upload</button>\n        <button class=\"nxe-menu-bar-button\" [hidden]=\"!canDownload\" (click)=\"download()\"><i class=\"nxe-download\" aria-hidden=\"true\"></i> Download</button>\n        <button class=\"nxe-menu-bar-button\" [hidden]=\"!canRename\" (click)=\"rename()\"><i class=\"nxe-edit\" aria-hidden=\"true\"></i> Rename</button>\n        <button class=\"nxe-menu-bar-button\" [hidden]=\"!canDelete\" (click)=\"remove()\"><i class=\"nxe-trash-empty\" aria-hidden=\"true\"></i> Delete</button>\n    </div>\n\n    <div class=\"nxe-menu-bar-right\">\n        <nxe-view-switcher></nxe-view-switcher>\n    </div>\n    <input style=\"display: none\" type=\"file\" multiple (change)=\"handleFiles($event.target.files)\" #uploader>\n</div>",
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: [".nxe-menu-bar{display:flex}.nxe-menu-bar .nxe-menu-bar-left{flex-grow:1;padding:10px}.nxe-menu-bar .nxe-menu-bar-button{background:transparent;border:0;border-radius:5px;cursor:pointer;font-family:inherit;font-size:inherit;font-weight:inherit;margin-right:20px;padding:5px}.nxe-menu-bar .nxe-menu-bar-button .nxe-folder{color:#fdb900}.nxe-menu-bar .nxe-menu-bar-button .nxe-arrows-cw{color:green}.nxe-menu-bar .nxe-menu-bar-button .nxe-trash-empty{color:#ca0801}.nxe-menu-bar .nxe-menu-bar-button:hover{background-color:#d7edff}"]
                },] }
    ];
    MenuBarComponent.ctorParameters = function () { return [
        { type: ExplorerService },
        { type: HelperService }
    ]; };
    MenuBarComponent.propDecorators = {
        uploader: [{ type: i0.ViewChild, args: ['uploader', { static: true },] }]
    };

    var ConfigProvider = /** @class */ (function () {
        function ConfigProvider(config) {
            this.config = config;
        }
        return ConfigProvider;
    }());

    var BreadcrumbsComponent = /** @class */ (function () {
        function BreadcrumbsComponent(explorerService, helperService, config) {
            var _this = this;
            this.explorerService = explorerService;
            this.helperService = helperService;
            this.config = config;
            this.breadcrumbs = [];
            this.sub = new rxjs.Subscription();
            this.sub.add(this.explorerService.breadcrumbs.subscribe(function (n) { return _this.buildBreadcrumbs(n); }));
        }
        BreadcrumbsComponent.prototype.buildBreadcrumbs = function (nodes) {
            var _this = this;
            this.breadcrumbs = nodes.map(function (n) { return ({ name: _this.helperService.getName(n.data) || _this.config.config.homeNodeName, node: n }); });
        };
        BreadcrumbsComponent.prototype.click = function (crumb) {
            this.explorerService.openNode(crumb.node.id);
        };
        BreadcrumbsComponent.prototype.ngOnDestroy = function () {
            this.sub.unsubscribe();
        };
        return BreadcrumbsComponent;
    }());
    BreadcrumbsComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'nxe-breadcrumbs',
                    template: "<div class=\"nxe-breadcrumbs\">\n    <span *ngFor=\"let crumb of breadcrumbs; last as last\">\n        <button (click)=\"click(crumb)\" class=\"nxe-breadcrumb-button\">{{ crumb.name }}</button>\n        <span *ngIf=\"!last\" class=\"nxe-breadcrumb-separator\">\n            <i class=\"nxe-angle-right\" aria-hidden=\"true\"></i>\n        </span>\n    </span>\n</div>",
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: [".nxe-breadcrumbs .nxe-breadcrumb-button{background:transparent;border:0;border-radius:5px;cursor:pointer;font-family:inherit;font-size:inherit;font-weight:inherit;padding:5px}.nxe-breadcrumbs .nxe-breadcrumb-button:hover{background-color:#d7edff}"]
                },] }
    ];
    BreadcrumbsComponent.ctorParameters = function () { return [
        { type: ExplorerService },
        { type: HelperService },
        { type: ConfigProvider }
    ]; };

    var ListComponent = /** @class */ (function (_super) {
        __extends(ListComponent, _super);
        function ListComponent(explorerService, helperService, filter) {
            var _this = _super.call(this, explorerService, helperService, filter) || this;
            _this.icons = {
                node: 'nxe-folder',
                leaf: 'nxe-doc',
            };
            return _this;
        }
        return ListComponent;
    }(BaseView));
    ListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'nxe-list',
                    template: "<div class=\"nxe-list\" nxeDragDrop (dragging)=\"dragging = $event\">\n    <div class=\"nxe-list-drag\" [ngClass]=\"{ dragging: dragging}\"></div>\n    <div class=\"nxe-list-backpad\" (click)=\"emptySpaceClick()\"></div>\n    <div class=\"nxe-list-container\">\n        <div class=\"nxe-list-wrapper \">\n            <table>\n                <thead>\n                    <tr>\n                        <th>Name</th>\n                        <th>Type</th>\n                        <th>Size</th>\n                        <th>Last Modified</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr *ngFor=\"let item of filteredItems\" (dblclick)=\"open($event, item)\" (click)=\"select($event, item)\"\n                        [ngClass]=\"{'nxe-list-row-selected':isSelected(item)}\">\n                        <td>\n                            <span class=\"nxe-list-icon\">\n                                <i [className]=\"item.isLeaf ? icons.leaf : icons.node\"></i>\n                            </span>\n                            {{ getDisplayName(item.data) }}\n                        </td>\n                        <td>{{ item.type }}</td>\n                        <td>{{ item.size }}</td>\n                        <td>{{ item.lastModified }}</td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>",
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: [".nxe-list{height:100%;position:absolute;width:100%}.nxe-list .nxe-list-drag{bottom:2px;left:2px;position:absolute;right:2px;top:2px;z-index:1}.nxe-list .nxe-list-drag.dragging{border:2px dashed #30a2ff;margin:-2px}.nxe-list .nxe-list-backpad{height:100%;left:0;position:absolute;top:0;width:100%}.nxe-list .nxe-list-container{display:flex;flex-wrap:wrap}.nxe-list .nxe-list-container .nxe-list-wrapper{display:inline-block;flex-grow:0;height:100%;width:100%;z-index:1}.nxe-list .nxe-list-container .nxe-list-wrapper table{border-collapse:collapse;border-spacing:0;width:100%}.nxe-list .nxe-list-container .nxe-list-wrapper table thead{border-bottom:1px solid #ccc}.nxe-list .nxe-list-container .nxe-list-wrapper table thead tr th{border-collapse:collapse;border-right:1px solid #ccc;border-spacing:0;font-weight:400;padding:10px;text-align:left}.nxe-list .nxe-list-container .nxe-list-wrapper table thead tr th:last-child{border-right:none}.nxe-list .nxe-list-container .nxe-list-wrapper table tbody tr:nth-child(2n){background-color:#f4f4f4}.nxe-list .nxe-list-container .nxe-list-wrapper table tbody tr.nxe-list-row-selected,.nxe-list .nxe-list-container .nxe-list-wrapper table tbody tr:hover{background-color:#d7edff}.nxe-list .nxe-list-container .nxe-list-wrapper table tbody tr td{padding:8px 10px}.nxe-list .nxe-list-container .nxe-list-wrapper table tbody tr td .nxe-list-icon{color:#555;margin-right:5px}.nxe-list .nxe-list-container .nxe-list-wrapper table tbody tr td .nxe-list-icon .nxe-folder{color:#fdb900}"]
                },] }
    ];
    ListComponent.ctorParameters = function () { return [
        { type: ExplorerService },
        { type: HelperService },
        { type: rxjs.BehaviorSubject, decorators: [{ type: i0.Inject, args: [FILTER_STRING,] }] }
    ]; };

    var SecondMenuBarComponent = /** @class */ (function () {
        function SecondMenuBarComponent() {
        }
        return SecondMenuBarComponent;
    }());
    SecondMenuBarComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'nxe-second-menu-bar',
                    template: "<div class=\"nxe-second-menu-bar\">\n    <div class=\"nxe-second-menu-bar-left\">\n        <nxe-breadcrumbs></nxe-breadcrumbs>\n    </div>\n    <div class=\"nxe-second-menu-bar-right\">\n        <nxe-filter></nxe-filter>\n    </div>\n</div>",
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: [".nxe-second-menu-bar{display:flex;padding:10px}.nxe-second-menu-bar .nxe-second-menu-bar-left{flex-grow:1}"]
                },] }
    ];

    var ViewSwitcherComponent = /** @class */ (function () {
        function ViewSwitcherComponent(currentView) {
            this.currentView = currentView;
            this.avialableView = exports.AvialableView;
        }
        ViewSwitcherComponent.prototype.setView = function (view) {
            this.currentView.next(view);
        };
        return ViewSwitcherComponent;
    }());
    ViewSwitcherComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'nxe-view-switcher',
                    template: "<div class=\"nxe-view-switcher\">\n    <button (click)=\"setView(avialableView.Icon)\"><i class=\"nxe-th-large\" aria-hidden=\"true\"></i></button>\n    <button (click)=\"setView(avialableView.List)\"><i class=\"nxe-menu\" aria-hidden=\"true\"></i></button>\n</div>",
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: [".nxe-view-switcher{padding:10px}.nxe-view-switcher button{background:transparent;border:0;border-radius:5px;cursor:pointer;font-family:inherit;font-size:inherit;font-weight:inherit;padding:5px}.nxe-view-switcher button:hover{background-color:#d7edff}"]
                },] }
    ];
    ViewSwitcherComponent.ctorParameters = function () { return [
        { type: rxjs.BehaviorSubject, decorators: [{ type: i0.Inject, args: [CURRENT_VIEW,] }] }
    ]; };

    var TreeComponent = /** @class */ (function () {
        function TreeComponent(explorerService, helperService) {
            var _this = this;
            this.explorerService = explorerService;
            this.helperService = helperService;
            this.treeNodes = [];
            this.expandedIds = [];
            this.sub = new rxjs.Subscription();
            this.sub.add(this.explorerService.tree.pipe(operators.filter(function (x) { return !!x; })).subscribe(function (node) {
                _this.addExpandedNode(node.id); // always expand root
                _this.treeNodes = _this.buildTree(node).children;
            }));
        }
        TreeComponent.prototype.open = function (node) {
            this.addExpandedNode(node.id);
            this.explorerService.openNode(node.id);
        };
        TreeComponent.prototype.expand = function (node) {
            this.addExpandedNode(node.id);
            this.explorerService.expandNode(node.id);
        };
        TreeComponent.prototype.collapse = function (node) {
            this.removeExpandedNode(node.id);
            var nodes;
            this.sub.add(this.explorerService.tree.pipe(operators.filter(function (x) { return !!x; })).subscribe(function (x) { return nodes = x; }));
            this.treeNodes = this.buildTree(nodes).children;
        };
        TreeComponent.prototype.getName = function (node) {
            return this.helperService.getName(node);
        };
        TreeComponent.prototype.ngOnDestroy = function () {
            this.sub.unsubscribe();
        };
        TreeComponent.prototype.buildTree = function (node) {
            var _this = this;
            var treeNode = {
                id: node.id,
                parentId: node.parentId,
                data: node.data,
                isLeaf: node.isLeaf,
                children: [],
                expanded: false
            };
            treeNode.expanded = this.expandedIds.indexOf(node.id) > -1;
            if (treeNode.expanded) {
                treeNode.children = node.children.filter(function (x) { return !x.isLeaf; }).map(function (x) { return _this.buildTree(x); });
            }
            return treeNode;
        };
        TreeComponent.prototype.addExpandedNode = function (id) {
            var index = this.expandedIds.indexOf(id);
            if (index === -1) {
                this.expandedIds.push(id);
            }
        };
        TreeComponent.prototype.removeExpandedNode = function (id) {
            var index = this.expandedIds.indexOf(id);
            this.expandedIds.splice(index, 1);
        };
        return TreeComponent;
    }());
    TreeComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'nxe-tree',
                    template: "<div class=\"nxe-tree\">\n    <ng-container *ngTemplateOutlet=\"tree;context:{nodes:treeNodes}\">\n    </ng-container>\n</div>\n\n<ng-template #tree let-nodes=\"nodes\">\n    <ul *ngIf=\"nodes && nodes.length > 0\">\n        <li *ngFor=\"let node of nodes\">\n            <div class=\"chevron\" *ngIf=\"!node.expanded\" (click)=\"expand(node)\"><i class=\"nxe-angle-right\" aria-hidden=\"true\"></i></div>\n            <div class=\"chevron\" *ngIf=\"node.expanded\" (click)=\"collapse(node)\"><i class=\"nxe-angle-down\" aria-hidden=\"true\"></i></div>\n\n            <div class=\"item\" (dblclick)=\"open(node)\">\n                <div class=\"folder-icon\"><i class=\"nxe-folder\" aria-hidden=\"true\"></i></div>\n                <div class=\"grow\" [innerText]=\"getName(node.data)\"></div>\n                <!-- <div class=\"ellipsis-icon\"><i class=\"fa fa-ellipsis-v\" aria-hidden=\"true\"></i></div> -->\n                <div class=\"highlighter\"></div>\n            </div>\n\n            <ng-container *ngTemplateOutlet=\"tree;context:{nodes:node.children}\">\n            </ng-container>\n        </li>\n    </ul>\n</ng-template> ",
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: [".nxe-tree{position:absolute}.nxe-tree ul{list-style-position:inside;margin:0 0 0 20px;padding:0}.nxe-tree li{list-style-type:none;padding:0;position:relative}.nxe-tree .chevron{color:#333;cursor:pointer;font-size:1.3rem;left:-20px;position:absolute;text-align:center;top:1px;width:21px}.nxe-tree .item{border-radius:5px;cursor:pointer;display:flex;padding:5px}.nxe-tree .item .folder-icon{margin-right:5px}.nxe-tree .item .folder-icon i{color:#555;font-weight:500}.nxe-tree .item .folder-icon i.nxe-folder{color:#fdb900}.nxe-tree .item .grow{flex:1}.nxe-tree .item:hover{background-color:#d7edff}"]
                },] }
    ];
    TreeComponent.ctorParameters = function () { return [
        { type: ExplorerService },
        { type: HelperService }
    ]; };

    var FilterComponent = /** @class */ (function () {
        function FilterComponent(filter, explorerService) {
            var _this = this;
            this.filter = filter;
            this.sub = new rxjs.Subscription();
            this.sub.add(explorerService.tree.subscribe(function () {
                _this.clear();
            }));
        }
        FilterComponent.prototype.onChange = function (e, value) {
            if (e.key === 'Escape') {
                this.input.nativeElement.value = '';
                this.filter.next('');
                return;
            }
            this.filter.next(value.trim());
        };
        FilterComponent.prototype.clear = function () {
            if (!this.input) {
                return;
            }
            this.input.nativeElement.value = '';
            this.filter.next('');
        };
        FilterComponent.prototype.ngOnDestroy = function () {
            this.sub.unsubscribe();
        };
        return FilterComponent;
    }());
    FilterComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'nxe-filter',
                    template: "<div class=\"nxe-filter\">\n    <input class=\"nxe-filter-input\" type=\"text\" #input (keyup)=\"onChange($event, input.value)\">\n    <button class=\"nxe-filter-button\" (click)=\"clear()\"><i class=\"nxe-cancel\" aria-hidden=\"true\"></i></button>\n</div>",
                    styles: [".nxe-filter .nxe-filter-input{border:1px solid #ccc;font-size:1rem;font-weight:300;padding:.25rem}.nxe-filter .nxe-filter-button{background:transparent;border:0;border-radius:5px;cursor:pointer;font-family:inherit;font-size:inherit;font-weight:inherit;margin-left:5px;padding:5px 2px 5px 5px}.nxe-filter .nxe-filter-button:hover{background-color:#d7edff}"]
                },] }
    ];
    FilterComponent.ctorParameters = function () { return [
        { type: rxjs.BehaviorSubject, decorators: [{ type: i0.Inject, args: [FILTER_STRING,] }] },
        { type: ExplorerService }
    ]; };
    FilterComponent.propDecorators = {
        input: [{ type: i0.ViewChild, args: ['input',] }]
    };

    var DragDropDirective = /** @class */ (function () {
        function DragDropDirective(explorerService) {
            this.explorerService = explorerService;
            this.dragEnter = new i0.EventEmitter();
            this.dragOver = new i0.EventEmitter();
            this.dragLeave = new i0.EventEmitter();
            this.dragDrop = new i0.EventEmitter();
            this.dragging = new i0.EventEmitter();
        }
        DragDropDirective.prototype.onDragEnter = function (event) {
            event.preventDefault();
            event.stopPropagation();
            this.dragEnter.emit(event);
            this.dragging.emit(true);
        };
        DragDropDirective.prototype.onDragOver = function (event) {
            event.preventDefault();
            event.stopPropagation();
            this.dragOver.emit(event);
            this.dragging.emit(true);
        };
        DragDropDirective.prototype.onDragLeave = function (event) {
            event.preventDefault();
            event.stopPropagation();
            this.dragLeave.emit(event);
            this.dragging.emit(false);
        };
        DragDropDirective.prototype.onDrop = function (event) {
            event.preventDefault();
            event.stopPropagation();
            var files = event.dataTransfer.files;
            if (files.length > 0) {
                this.explorerService.upload(files);
                this.dragDrop.emit(files);
            }
            this.dragging.emit(false);
        };
        return DragDropDirective;
    }());
    DragDropDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[nxeDragDrop]'
                },] }
    ];
    DragDropDirective.ctorParameters = function () { return [
        { type: ExplorerService }
    ]; };
    DragDropDirective.propDecorators = {
        dragEnter: [{ type: i0.Output }],
        dragOver: [{ type: i0.Output }],
        dragLeave: [{ type: i0.Output }],
        dragDrop: [{ type: i0.Output }],
        dragging: [{ type: i0.Output }],
        onDragEnter: [{ type: i0.HostListener, args: ['dragenter', ['$event'],] }],
        onDragOver: [{ type: i0.HostListener, args: ['dragover', ['$event'],] }],
        onDragLeave: [{ type: i0.HostListener, args: ['dragleave', ['$event'],] }],
        onDrop: [{ type: i0.HostListener, args: ['drop', ['$event'],] }]
    };

    var Config = {
        homeNodeName: 'Files'
    };

    var ɵ0 = Config;
    var NgxExplorerModule = /** @class */ (function () {
        function NgxExplorerModule() {
        }
        return NgxExplorerModule;
    }());
    NgxExplorerModule.decorators = [
        { type: i0.NgModule, args: [{
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
                        common.CommonModule
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

    exports.BaseView = BaseView;
    exports.BreadcrumbsComponent = BreadcrumbsComponent;
    exports.CURRENT_VIEW = CURRENT_VIEW;
    exports.Config = Config;
    exports.ConfigProvider = ConfigProvider;
    exports.DataService = DataService;
    exports.ExplorerComponent = ExplorerComponent;
    exports.ExplorerService = ExplorerService;
    exports.FILTER_STRING = FILTER_STRING;
    exports.FilterComponent = FilterComponent;
    exports.HelperService = HelperService;
    exports.IconsComponent = IconsComponent;
    exports.ListComponent = ListComponent;
    exports.MenuBarComponent = MenuBarComponent;
    exports.NgxExplorerModule = NgxExplorerModule;
    exports.SecondMenuBarComponent = SecondMenuBarComponent;
    exports.TreeComponent = TreeComponent;
    exports.Utils = Utils;
    exports.ViewSwitcherComponent = ViewSwitcherComponent;
    exports.ɵ0 = ɵ0;
    exports.ɵa = DragDropDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-explorer.umd.js.map
