import {
    isEmpty,
    normalizeBool,
    warn
} from './util';

export class Field{

    /** @internal */
    _parent: Field;
    /** @internal */
    _children: Field[] = [];
    /** @internal */
    _hidden: boolean = false;
    /** @internal */
    _isParentHidden: boolean;


    public get hidden() { return this._isParentHidden ? true : this._hidden; }

    public set hidden(value: boolean) {
        value = !!normalizeBool(value);
        if (this._hidden !== value) {
            this._hidden = value;
            this.notifyChildren();
        }
    }
    
    setParent(parent: Field) {
        if (this._parent !== parent) {
            this._parent = parent;
            this.parentStatusChanged();
        }
    }
    
    addChild(child: Field) {
        child.setParent(this);
        this._children.push(child)
    }
    
    parentStatusChanged() {
        if (this._isParentHidden === this._parent.hidden) {
            warn('parentStatusChanged() was called but parent never changed.... you should report this bug.');
        }
        this._isParentHidden = this._parent.hidden;
        this.notifyChildren();
    }

    notifyChildren() {
        if (isEmpty(this._children)) { return false; }
        this._children.forEach((child) => {
            child.parentStatusChanged();
        });
        return true;
    }
}