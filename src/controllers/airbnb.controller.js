
// Importar los servicio
const { consultarDocumentos } = require('../services/mongodb.service');


const consultarAirbnb = async (req, res) => {
    let respuesta = {}
    try {
        respuesta.ok = true
        respuesta.message = "Airbnb consultados"
        let resultado = await consultarDocumentos(process.env.COLLECTION_AIRBNB)
        respuesta.info = resultado
        res.send(respuesta)
    } catch (error) {
        console.log(error);
        respuesta.ok = false
        respuesta.message = "Ha ocurrido un error consultando los airbnb."
        respuesta.info = error
        res.status(500).send(respuesta)
    }
}

const consultarAirbnbPropertyType = async (req, res) => {
    let respuesta = {}
    try {
        respuesta.ok = true
        respuesta.message = "Airbnb consultados"
        let resultados = await consultarDocumentos(process.env.COLLECTION_AIRBNB)
        respuesta.info = resultados.map((resultado)=> resultado.property_type)  // Se selecciona los campos necesarios.
        res.send(respuesta)
    } catch (error) {
        console.log(error);
        respuesta.ok = false
        respuesta.message = "Ha ocurrido un error consultando los airbnb."
        respuesta.info = error
        res.status(500).send(respuesta)
    }
}

module.exports = {
    consultarAirbnb,
    consultarAirbnbPropertyType

}
