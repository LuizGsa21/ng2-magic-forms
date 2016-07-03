import {isEmpty} from './util';
export interface IIOptionField {

    key: string;
    type: string;

    hostClassName?: string;
    layoutClassName?: string;
    templateClassName?: string;

    hidden?: any;
    validators?: any[];
    defaultValue?: any;
    children?: IIOptionField[];

    /**
     * Options defined by template and layout.
     */
    templateOptions?: any;

    /**
     * Field events
     */
    valueChanges: any;
    onClick: any;
    onBlur: any;
    onFocus: any;
}


export class FieldOptions  {

    constructor(options: IIOptionField) {
        
    }

}

export class Field {

    /** @internal */
    _parent: Field;
    /** @internal */
    _children: Field[] = [];
    /** @internal */
    _hidden: boolean = false;
    /** @internal */
    _isParentHidden: boolean;


    get hidden() { return this._isParentHidden ? true : this._hidden; }
    
    set hidden(value: boolean) {
        if (this._hidden !== value) {
            this._hidden = !!value;
            this.notifyChildren();
        }
    }
    
    setParent(parent: Field) {
        this._parent = parent;
        this._isParentHidden = parent.hidden;
    }
    
    addChild(child: Field) {
        child.setParent(this);
        this._children.push(child)
    }
    
    parentStatusChanged() {
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