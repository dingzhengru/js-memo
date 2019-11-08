let x = {
  name: 'foo',
  hello: function() {
    setTimeout(() => {
      console.log('arrow', this.name); // foo
    }, 100);
    
    setTimeout(function() {
      console.log('not arrow', this.name); // undefined
    }, 100);
  }
}
x.hello()