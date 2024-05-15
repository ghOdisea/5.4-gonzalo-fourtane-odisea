use('restaurants');

const DB = db.getCollection('restaurants')
// Escribe una consulta para mostrar todos los documentos en la colección Restaurantes.

DB.find()

// Escribe una consulta para mostrar el restaurante_id, name, borough y cuisine de todos los documentos en la colección Restaurantes.

DB.find( { }, {restaurant_id: 1, name: 1, borough: 1, cuisine: 1})

// Escribe una consulta para mostrar el restaurante_id, name, borough y cuisine, pero excluyendo el campo _id por todos los documentos en la colección Restaurantes.

DB.find( { }, {restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0})

// Escribe una consulta para mostrar restaurant_id, name, borough y zip code, pero excluyendo el campo _id por todos los documentos en la colección Restaurantes.

DB.find( { }, {restaurant_id: 1, name: 1, borough: 1, "address.zipcode": 1, _id: 0})

// Escribe una consulta para mostrar todos los restaurantes que están en el Bronx.

DB.find( { borough: "Bronx" }, {name: 1, borough: 1, _id: 0})

// Escribe una consulta para mostrar los primeros 5 restaurantes que están en el Bronx.

DB.find( { }, {name: 1, borough: "Bronx", _id: 0}).limit(5)

// Escribe una consulta para mostrar los 5 restaurantes después de saltar los primeros 5 que sean del Bronx.

DB.find( { }, {name: 1, borough: "Bronx", _id: 0}).limit(5).skip(5)

// Escribe una consulta para encontrar los restaurantes que tienen algún resultado mayor de 90.

DB.find( { "grades.score": { $gt: 90 } }, {name: 1, grades: 1, _id: 0} )

// Escribe una consulta para encontrar los restaurantes que tienen un resultado mayor que 80 pero menos que 100.

DB.find( { "grades.score": { $lt: 100, $gt: 80 } }, {name: 1, grades: 1, _id: 0} )

// Escribe una consulta para encontrar los restaurantes situados en una longitud inferior a -95.754168.

DB.find( { "address.coord.0" : {$lt: -95.754168 }}, {name: 1, address: 1, _id: 0} )

// Escribe una consulta de MongoDB para encontrar los restaurantes que no cocinan comida 'American' y tienen algún resultado superior a 70 y longitud inferior a -65.754168.

DB.find( 
    { cuisine: { $ne: "American" },
    "grades.score": { $gt: 70 },
    "address.coord.0": { $lt: -65.754168 } },
    {name: 1, cuisine: 1, _id: 0})

// Escribe una consulta para encontrar los restaurantes que no preparan comida 'American' y tienen algún resultado superior a 70 y que, además, se localizan en longitudes inferiores a -65.754168. Nota : Realiza esta consulta sin utilizar operador $and.

DB.find( 
    { cuisine: { $ne: "American" }, "grades.score": { $gt: 70 }, "address.coord.0": { $lt: -65.754168 } }, {name: 1, cuisine: 1, _id: 0})


// Escribe una consulta para encontrar los restaurantes que no preparan comida 'American', tienen alguna nota 'A' y no pertenecen a Brooklyn. Se debe mostrar el documento según la cuisine en orden descendente.

DB.find( 
    { cuisine: { $ne: "American" }, "grades.grade": "A", borough: { $ne: "Brooklyn" } },
    { name: 1, cuisine: 1, _id: 0}).sort( { cuisine: -1 } )


// Escribe una consulta para encontrar el restaurante_id, name, borough y cuisine para aquellos restaurantes que contienen 'Wil' en las tres primeras letras en su nombre.

DB.find(
    { name: /^Wil/ },
    { restaurant_id: 1, name: 1, borough: 1 }
)

// Escribe una consulta para encontrar el restaurante_id, name, borough y cuisine para aquellos restaurantes que contienen 'ces' en las últimas tres letras en su nombre.

DB.find(
    { name: { $regex: /ces$/ } },
    { restaurant_id: 1, name: 1, borough: 1 }
)

// Escribe una consulta para encontrar el restaurante_id, name, borough y cuisine para aquellos restaurantes que contienen 'Reg' en cualquier lugar de su nombre.

DB.find(
    { name: { $regex: /Reg/} },
    { restaurant_id: 1, name: 1, borough: 1 }
)

// Escribe una consulta para encontrar los restaurantes que pertenecen al Bronx y preparan platos americanos o chinos.

DB.find(
    { cuisine: { $in: [ "American", "Chinese" ] }, borough: "Bronx" },
    { name: 1, borough: 1, cuisine: 1 }
)

// Escribe una consulta para encontrar el restaurante_id, name, borough y cuisine para aquellos restaurantes que pertenecen a Staten Island, Queens, Bronx o Brooklyn.

DB.find(
    { borough: { $in: [ "Staten Island", "Queens", "Bronx", "Brooklyn" ] } },
    { _id: 0, restaurant_id: 1, name: 1, borough: 1 }
)


// Escribe una consulta para encontrar el restaurante_id, name, borough y cuisine para aquellos restaurantes que NO pertenecen a Staten Island, Queens, Bronx o Brooklyn.

DB.find(
    { borough: { $nin: [ "Staten Island", "Queens", "Bronx", "Brooklyn" ] } },
    { _id: 0, restaurant_id: 1, name: 1, borough: 1 }
)

// Escribe una consulta para encontrar el restaurante_id, name, borough y cuisine para aquellos restaurantes que consigan una nota menor que 10.

DB.find(
    { "grades.score": { $lt: 10 } },
    { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
)

// Escribe una consulta para encontrar el restaurante_id, name, borough y cuisine para aquellos restaurantes que preparan marisco ('seafood') excepto si son 'American', 'Chinese' o el name del restaurante comienza con letras 'Wil'.

DB.find( {
    cuisine: "Seafood",
    $or: [ { cuisine: { $nin: [ "American", "Chinese" ] }} ,{ name: { $not: /^Wil/ }} ] 
},
    { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
)


// ####################################





// Escribe una consulta para encontrar el restaurante_id, name y gradas para aquellos restaurantes que consigan un grade de "A" y un resultado de 11 con un ISODate "2014-08-11T00:00:00Z".

DB.find( 
    { $and: [
        {"grades.grade": "A"}, 
        { "grades.score": 11 }, 
        { "grades.date": new Date ( "2014-08-11T00:00:00Z" ) }
    ] },
    { _id: 0, restaurant_id: 1, name: 1, grades: 1}
)

// Escribe una consulta para encontrar el restaurante_id, name y gradas para aquellos restaurantes donde el 2º elemento del array de grados contiene un grade de "A" y un score 9 con un ISODate "2014-08-11T00:00:00Z" .

DB.find( 
    { $and: [
        {"grades.1.grade": "A"}, 
        { "grades.1.score": 9 }, 
        { "grades.date": new Date ( "2014-08-11T00:00:00Z" ) }
    ] },
    { _id: 0, restaurant_id: 1, name: 1, grades: 1}
)

// Escribe una consulta para encontrar el restaurante_id, name, dirección y ubicación geográfica para aquellos restaurantes donde el segundo elemento del array coord contiene un valor entre 42 y 52.

DB.find( 
    { "address.coord": { $gt: 42, $lt: 52} },
    { _id: 0, restaurant_id: 1, name: 1,  address: 1}
)

// Escribe una consulta para organizar los restaurantes por nombre en orden ascendente.

DB.find( { }, { _id: 0, name: 1} ).sort( { name : 1} )

// Escribe una consulta para organizar los restaurantes por nombre en orden descendente.

DB.find( {}, { _id: 0, name: 1} ).sort( { name : -1} )

// Escribe una consulta para organizar los restaurantes por el nombre de la cuisine en orden ascendente y por el barrio en orden descendente.


DB.find( {}, { _id: 0, name: 1, cuisine: 1, borough: 1 }).sort({ cuisine : 1}).sort({ borough : -1})

// Escribe una consulta para saber si las direcciones contienen la calle.

DB.find( { "address.street": { $exists: true } }, { grades: 0, _id: 0 } )

// Escribe una consulta que seleccione todos los documentos en la colección de restaurantes donde los valores del campo coord es de tipo Double.

DB.find( { "address.coord": { $type: "double" } } )

// Escribe una consulta que seleccione el restaurante_id, name y grade para aquellos restaurantes que devuelven 0 como residuo después de dividir alguno de sus resultados por 7.

DB.find(
    { "grades.score": { $mod: [7, 0] } },
    { restaurant_id: 1, name: 1, grades: 1 }
)

// Escribe una consulta para encontrar el name de restaurante, borough, longitud, latitud y cuisine para aquellos restaurantes que contienen 'mon' en algún lugar de su name.

DB.find( 
    { name: { $regex: /mon/} }, 
    { _id: 0, name: 1, borough: 1, "address.coord": 1, cuisine: 1 })
    
    
// Escribe una consulta para encontrar el name de restaurante, borough, longitud, latitud y cuisine para aquellos restaurantes que contienen 'Mad' como primeras tres letras de su name.
    

DB.find( 
    { name:  /^Mad/ }, 
    { _id: 0, name: 1, borough: 1, "address.coord": 1, cuisine: 1 })
