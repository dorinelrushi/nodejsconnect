const mongoose =  require("mongoose");
const Schema = mongoose.Schema;


const Dorinel =  new Schema({
    title: {
        type :String,
        required: true
    },
    describe : {
        type : String,
        required : true
    }
})

const Ninja = mongoose.model("ninja",Dorinel);
module.exports = Ninja;