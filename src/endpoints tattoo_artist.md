////////////////////////////////////////////////////////////////////////////

POST localhost:4000/tattoo_artist/register
Crea tatuadores con el token con role super_admin, comprobando la sintaxis del email y si hay alguien registrado con el mismo email, y encriptando el password.
Introducir:
    Token
Datos a incluir en la consulta:
{
  "name":"Borja Gutierrez",
  "email":"borja@borja.com",
  "password":"borja",
  "phone":"611345622"
}

////////////////////////////////////////////////////////////////////////////

POST localhost:4000/tattoo_artist/login
Muestra el token del tatuador solicitado.
Introducir:
    Sin Token
    Sin Id
Datos a incluir en la consulta:
{
  "email":"angel@angel.com",
  "password":"angel"
}

////////////////////////////////////////////////////////////////////////////

DELETE localhost:4000/tattoo_artist/deleteArtistById/2
Borra el tatuador con el id introducido, si el rol del token es super_admin
Introdur:
    Token super_admin
    Id
Datos a incluir en la consulta:
    Nada

////////////////////////////////////////////////////////////////////////////

GET localhost:4000/tattoo_artist/getAllTattooArtist
Muestra un lista de todos los tatuadores con el token de super_admin
Introducir:
    Token super_admin
Datos a incluir en la consulta:
    Nada
    


