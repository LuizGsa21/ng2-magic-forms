import {
    isEmpty,
    normalizeBool,
    warn,
    throwError
} from './util';

export class Field{

    /** @internal */
    _parent: Field;
    /** @internal */
    _children: Field[] = [];
    /** @internal */
    _hidden: boolean;
    /** @internal */
    _isParentHidden: boolean;


    /**
     * returns true when itself or any parent up the tree is hidden
     */
    get hidden() { return this._isParentHidden ? true : this._hidden; }

    set hidden(value: boolean) {
        value = !!normalizeBool(value);
        if (this._hidden !== value) {
            this._hidden = value;
            this.notifyChildren();
        }
    }

    get isSelfHidden() { return this._hidden; }

    setParent(parent: Field) {
        this._parent = parent;
        this.parentStatusChanged(true);
    }
    
    addChild(child: Field) {
        if (child === this) {
            throwError('A child cannot be a parent of itself...');
        }
        child.setParent(this);
        this._children.push(child)
    }

    /** @overridden */
    includeOrExcludeSelf() {}

    parentStatusChanged(ignoreDebug?:boolean) {
        if (this._isParentHidden === this._parent.hidden) {
            warn('parentStatusChanged() was called but parent never changed.... you should report this bug.');
        }
        this._isParentHidden = this._parent.hidden;
        this.notifyChildren();
        this.includeOrExcludeSelf();
    }

    notifyChildren() {
        if (isEmpty(this._children)) { return false; }
        this._children.forEach((child) => {
            child.parentStatusChanged();
        });
        return true;
    }
}