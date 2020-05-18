const Testimonial = require('../models/Testimoniales');

exports.mostrarTestimoniales = async (req, res) => {
     const testimoniales = await Testimonial.findAll()
     res.render('testimoniales', {
          pagina: 'Testimoniales',
          testimoniales
     })
}

exports.agregarTestimonial = (req, res) => {
     // validar que todos los campos estén llenos
     let {nombre, correo, mensaje} = req.body;

     let errores = [];
     if(!nombre) {
          errores.push({mensaje : 'Agrega tu Nombre'})
     }
     if(!correo) {
          errores.push({mensaje : 'Agrega tu Correo'})
     }
     if(!mensaje) {
          errores.push({mensaje : 'Agrega tu Mensaje'})
     }

     // revisar por errores
     if(errores.length > 0) {
          // muestra la vista con 
          res.render('testimoniales',{
               // para que no se borren los campos llenados correctamente
               errores,
               nombre,
               correo,
               mensaje
          })
     } else {
          // almacenar en la db
          Testimonial.create({
               nombre,
               correo,
               mensaje
          })
          .then(testimonial => res.redirect('/testimoniales'))
          .catch(error => console.log(error));
     }
}