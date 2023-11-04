POST localhost:4000/appointment/register/7
Crea citas entre usuarios y tatuadores, comprobando el id, la fecha, el tatuador, el turno, el tipo de trabajo y si esta disponible con esos datos para crear la cita.
Introducir:
    Token
    Id usuario
Datos a incluir en la consulta:
{ 
"artist_id" : "4",
"date" : "2023/11/18",
"shift" : "tarde",
"type_work": "tattoo",
"description" : "Bienve Algo bonito en la pierna"
}

////////////////////////////////////////////////////////////////////////////

POST localhost:4000/appointment/loginAppointmentsById/9
Muestra las citas del usuario id si coincide con el token del usuario. Tambien funciona si el token es de super_admin.
Introducir:
    Token
    Id usuario
Datos a incluir en la consulta:
    Nada

////////////////////////////////////////////////////////////////////////////

POST localhost:4000/appointment/loginArtistAppointments/4
Muestra las citas de un tatuador por su id si coincide con el token del tatuador. Tambien funciona si el token es de super_admin.
Introducir:
    Token
    Id tatuador
Datos a incluir en la consulta:
    Nada

////////////////////////////////////////////////////////////////////////////

PUT localhost:4000/appointment/updateAppointmentById/7
Modifica la cita correspondiente al id, comprobando si el token introducido esta autorizado a realizar la consulta, ya sea porque es su cita o porque es super_admin.
Introducir:
    Token
    Id cita
Datos a incluir en la consulta:
{
  "user_id":"9",
  "artist_id":"1",
  "date": "2023/11/30",
  "shift": "mañana",
  "type_work": "tattoo",
  "description": "cambio cita 7 con super_admin"
}

////////////////////////////////////////////////////////////////////////////

DELETE localhost:4000/appointment/deleteAppointmentById/6
Elimina la cita correspondiente al id, comprobando si el token introducido esta autorizado a realizar la consulta, ya sea porque es su cita o porque es super_admin.
Introducir:
    Token
    Id cita
Datos a incluir en la consulta:
    Nada


