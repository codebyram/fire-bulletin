import _ from 'lodash';

class FormStore {
  constructor(){
    this.subscriptions = [];
    this.values = {};
    this.errors = [];
  }

  setValue(element,value,sync = true) {
    if(this.values.hasOwnProperty(element)) {
      if(this.values[element] !== value) {
        this.values[element] = value;
        if(sync)
          this.subscriptions.forEach((func)=>{func('change',{element, value },this.getAll())});
      }
    }
    else
      this.values[element] = value;
  }

  forceValidate(){
    this.subscriptions.forEach((func)=>{func('validate')});
  }

  getValue(element){
    return this.values[element];
  }
  getAll(){
    let toReturn = {};
    for(let item in this.values){
      toReturn[item] = this.values[item];
    }
    return toReturn;
  }

  setError({element,message}){
    let item = {element,message};
    let index = _.findIndex(this.errors,(err=>err.element===element))
    if(index == -1) {
      this.errors.push(item);
    } else {
      this.errors[index] = item;
    }
  }

  removeError(element){
    var self = this;
    this.errors.forEach((error,i)=>{
      if(error.element == element)
        self.errors.splice(i,1);
    })
  }

  subscribe(func){
    this.subscriptions.push(func);
    let subscriptions = this.subscriptions;
    let index = this.subscriptions.indexOf(func);
    return ()=>{
      subscriptions.splice(this.subscriptions.indexOf(func),1);
    }
  }

}

export default FormStore;
