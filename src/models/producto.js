const {model, Schema} =require('mongoose')

const ProductoSchema=new Schema({
    nombre:{
        type:String,
        require:[true,'El nombre es requerido']
    },
    desc:{
        type:String,
        require:[true,'La descripcion es requerida',]
      },
    cant:{
        type:Number,
        default:1,
    },
    precio:{
       type:Number,
       require:[true,'El precio es requerido']
    },
    costo:{
        type:Number,
    },
    img:{
        type:[],
        required:[true,'La imagen es requerida']
    },
    detalles_producto:{
        type:[],
        require:true
    },
    logo_marca:{
        type:String,
        
    },
})

module.exports= model('producto',ProductoSchema)