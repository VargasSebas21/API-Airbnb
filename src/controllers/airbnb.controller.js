
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

const consultarAirbnbReviews = async (req, res) => {
    let respuesta = {}
    try {
        respuesta.ok = true
        respuesta.message = "Airbnb consultados"
        let resultados = await consultarDocumentos(process.env.COLLECTION_AIRBNB)
        resultados = resultados.sort((a,b)=> {
            if (a.number_of_reviews < b.number_of_reviews) return 1
            if (a.number_of_reviews > b.number_of_reviews) return -1
            return 0

        })  // Se ordena de mayor a menor.
        respuesta.info = resultados.map((resultado)=> {
            return {
                name: resultado.name, beds: resultado.beds, number_of_reviews: resultado.number_of_reviews, price: resultado.price
            }
        }).slice(0,20)  // Se seleccionan los campos necesarios y se toma una muestra de 20.
        res.send(respuesta)
    } catch (error) {
        console.log(error);
        respuesta.ok = false
        respuesta.message = "Ha ocurrido un error consultando los airbnb."
        respuesta.info = error
        res.status(500).send(respuesta)
    }
}

const consultarAirbnbBeds = async (req, res) => {
    let respuesta = {}
    try {
        respuesta.ok = true
        respuesta.message = "Airbnb consultados"
        let resultados = await consultarDocumentos(process.env.COLLECTION_AIRBNB, {
            beds: {$gt:+req.params.nro_beds}
        }) // Se consultan solo los Airbn que tengan un numero de camas > nro_beds.
        resultados = resultados.sort((a,b)=> {
            if (a.beds < b.beds) return 1
            if (a.beds > b.beds) return -1
            return 0

        })  // Se ordena de mayor a menor.
        respuesta.info = resultados.map((resultado)=> {
            return {
                name: resultado.name, beds: resultado.beds, number_of_reviews: resultado.number_of_reviews, price: resultado.price
            }
        })  // Se filtran solo los atributos que se necesitan.
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
    consultarAirbnbPropertyType,
    consultarAirbnbReviews,
    consultarAirbnbBeds


}
