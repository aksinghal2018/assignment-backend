const mongoose =require('mongoose')
const invoiceSchema=new mongoose.Schema({
userid:{
    type:String,
    required:true
},
orderdate:{
type:String,
default:Date()
},
invoicename:{
    type:String,
    required:true
}
})
module.exports=mongoose.model("invoices",invoiceSchema)