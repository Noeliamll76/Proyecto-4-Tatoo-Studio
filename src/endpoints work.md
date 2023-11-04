POST localhost:4000/work/registerWork
Crea trabajos realizados por los tatuadores, con token de admin o super_admin
Introducir:
    Token
Datos a incluir en la consulta:
{
"createdBy_id" : "6",
"description": "Varios piercings",
"image": "https://i.pinimg.com/originals/e2/9d/f5/e29df557329cfd350460ce16176680d0.jpg"
}

////////////////////////////////////////////////////////////////////////////

POST localhost:4000/work/loginWorkArtist/6
Muestra los trabajos de un tatuador con id y su token, y tambien con token super_admin.
Introducir:
    Token
    Id
Datos a incluir en la consulta:
    Nada

////////////////////////////////////////////////////////////////////////////

GET localhost:4000/work/getAllWorks
Muestra los trabajos de todos los tatuadores, de forma abierta.
Datos a incluir en la consulta:
    Nada
