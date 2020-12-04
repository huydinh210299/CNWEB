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
      return (a && b && (a === b || a.toString() == b.toString())) ? 'selected' : ''; 
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
    dealStatus: function(a,options){
      if (a === "pending") return "Đang xử lý";
      if (a === "done") return "Thành công";
      return "Thất bại";
    },
    checkDealStatus: function(a,options){
      return a === "pending" ? "" : "disabled";
    },
    checkNext: function(a,options){
      //trang hiện tại không có data
      return a == "0" ? "disabled" : "";
    },
    checkPrev: function(a,options){
      //Nếu trang hiện tại đang là 1;
      return a == "1" ? "disabled" : "";
    },
    //render giá đấu
    highestDeal: function(array,options){
      if(array.length == 0) return "Chưa có"
      else{
        const maxValueOfY = Math.max(...array.map(o => o.auction_price), 0);
        if(maxValueOfY) return maxValueOfY + "Đ";
        return "Chưa có";
      }
    },
    //trả về loại của deal: mua, đấu giá
    dealType: function(a, options){
      return a ? "Đấu giá" : "Mua";
    },
    auctionPrice: function(a, options){
      return a ? a + "Đ": "";
    }
  }

  module.exports = helpers;