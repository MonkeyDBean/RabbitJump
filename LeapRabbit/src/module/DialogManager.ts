module DialogManager
{
    export let hint;

    export let dict1 = {};

    export let dict2 = {};

    export let dict3 = {};

    export let moment_dict0:string = "";

    export let moment_dict1:string = "";

    export let moment_dict2:string = "";

    export let moment_dict3:string = "";

    export function open(dialogClass:any, dialogName:string, num:number = 1)
    {
        if(num == 1)
        {
            if(this.moment_dict1 != "")
            {
                this.dict1[this.moment_dict1].hide();
            }
            if (this.dict1[dialogName] == null)
            {
                let dialog = new dialogClass();

                dialog.show();

                this.dict1[dialogName] = dialog;
            }
            else
            {
                if(!this.dict1[dialogName].showing) this.dict1[dialogName].show();
            }
            this.moment_dict1 = dialogName;
        }
        else if (num == 2)
        {
            if(this.moment_dict2 != "")
            {
                this.dict2[this.moment_dict2].hide();
            }

            if (this.dict2[dialogName] == null)
            {
                let dialog = new dialogClass();

                dialog.show();

                this.dict2[dialogName] = dialog;
            }
            else
            {
                if(!this.dict2[dialogName].showing) this.dict2[dialogName].show();
            }
            this.moment_dict2 = dialogName;//记录当前正在打开
            console.log("当前打开",this.moment_dict2);
        }
        else if (num == 3)
        {
            if(this.moment_dict3 != "")
            {
                this.dict3[this.moment_dict3].hide();
            }
            if (this.dict3[dialogName] == null)
            {
                let dialog = new dialogClass();
                dialog.show();
                this.dict3[dialogName] = dialog;
            }
            else
            {
                if(!this.dict3[dialogName].showing) this.dict3[dialogName].show();
            }
            this.moment_dict3 = dialogName;
        }
        if(num == 0)
        {
            if (hint == null)
            {
                hint = new dialogClass();

                hint.show();
            }
        }
        else
        {
            if (hint != null)
            {
                hint.hide();
                hint.show();
            }
        }
    }

    export function remove (dialogName:string, num:number = 1, hideOnly:boolean = false)
    {
        if (num == 1)
        {
            if (this.dict1[dialogName] != null)
            {
                if(this.dict1[dialogName].parent) {
                    this.dict1[dialogName].hide();
                }
                if (hideOnly == false) {
                    this.dict1[dialogName] = null;
                }
            }
        }
        else if (num == 2)
        {
            if (this.dict2[dialogName] != null)
            {
                if(this.dict2[dialogName].parent) {
                    this.dict2[dialogName].hide();
                }
                if (hideOnly == false) {
                    this.dict2[dialogName] = null;
                }
            }
        }
        else if (num == 3)
        {
            if (this.dict3[dialogName] != null)
            {
                if(this.dict3[dialogName].parent) {
                    this.dict3[dialogName].hide();
                }
                if (hideOnly == false) {
                    this.dict3[dialogName] = null;
                }
            }
        }
    }
}