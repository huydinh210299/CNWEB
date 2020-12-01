const helpers = {
    //Hàm thực hiện so sánh giá trị
    equal : function(a,b,options) {
      if (a === b) { return options.fn(this); }
      return options.inverse(this);
    },
    notequal : function(a,b,options) {
      if (a !== b) { return options.fn(this); }
      return options.inverse(this);
    },
    isSelected: function (a, b) {
      return a === b ? 'selected' : ''; 
    },
    isActive: function (a){
      return a === 0 ? 'active' : '';
    },
    isNull: function(a, options){
      if (a === null || a === "") { options.fn(this); }
      return  options.inverse(this);
    },
    notNull: function(a, options){
      if (a !== null && a !== "") { options.fn(this); }
      return  options.inverse(this);
    },
  }

  module.exports = helpers;