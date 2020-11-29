module.exports = {
    toArrObject : function(rs){
        return rs.map(rs => rs.toObject());
    },

    toObject : function(rs){
        return rs ? rs.toObject() : rs;
    }
}