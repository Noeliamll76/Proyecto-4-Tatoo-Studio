POST localhost:4000/user/register  
Crea usuarios, comprobando el email y encriptando el password.
Introducir:
    Sin Token
    Sin Id
Datos a incluir en la consulta:
{
  "name":"Bruno Olivares",
  "email":"bruno@bruno.com",
  "password":"bruno",
  "phone":"632233444"
}

////////////////////////////////////////////////////////////////////////////

POST localhost:4000/user/login
Muestra el token del usuario solicitado.
Introducir:
    Sin Token
    Sin Id
Datos a incluir en la consulta:
{
  "email":"noelia@noelia.com",
  "password":"noelia"
}

////////////////////////////////////////////////////////////////////////////

GET localhost:4000/user/profile
Muestra datos del usuario al introducir su token personal.
Introducir:
    Token
Datos a incluir en la consulta:
    Nada

////////////////////////////////////////////////////////////////////////////

PUT localhost:4000/user/updateUserByToken
Modifica los datos del usuario, y en el caso de modificar email, comprueba sintaxis y si existe en otro usuario. En el caso de modificar el password, tambien lo encripta.
Introducir:
    Token
Datos a incluir en la consulta:
{
  "name":"Noelia Marcos",
  "email":"noelia@noelia.com",
  "password":"noelia",
  "phone":"600739469"
}

////////////////////////////////////////////////////////////////////////////


