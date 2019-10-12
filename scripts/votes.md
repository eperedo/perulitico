# Structure for votes

### Posible values for votes

- Si: A Favor
- No: En contra
- Abst: Abstencion
- SINRESP: Sin Respuesta
- PC: Presidente del Congreso
- LE: Licencia por enfermedad
- LO: Licencia Oficial

### Poll

```json
{
	"id": 1,
	"title": "2016-11-10 10:56:00",
	"date": "PROYECTO DE LEY 23: EXTENDER LA OBLIGACION DE LOS FUNCIONARIOS Y SERVIDORES PUBLICOS QUE PRESENTAR DECLARACION JURADA DE INGRESOS BIENES Y RENTAS PARA INCREMENTAR LOS ALCANCES DE LA FISCALIZACION  QUE REALIZA LA CONTRALORIA GENERAL DE LA REPUBLICA",
	"totalSi": 20,
	"totalNo": 40,
	"totalAbst": 30,
	"totalPc": 1,
	"totalLE": 10,
	"totalLO": 29
}
```

### Poll Details (votes)

```json
[
	{
		"id": 1,
		"pollId": 1,
		"politicianId": 21283371283,
		"value": "Si"
	},
	{
		"id": 2,
		"pollId": 1,
		"politicianId": 33333333333,
		"value": "No"
	},
	{
		"id": 3,
		"pollId": 1,
		"politicianId": 444444444444,
		"value": "Abst"
	}
]
```

### Option 2 (NoSql)

Since a poll only can have 130 votes max. A possibility can be to include results
as another property.

```json
{
	"id": 1,
	"title": "2016-11-10 10:56:00",
	"date": "PROYECTO DE LEY 23: EXTENDER LA OBLIGACION DE LOS FUNCIONARIOS Y SERVIDORES PUBLICOS QUE PRESENTAR DECLARACION JURADA DE INGRESOS BIENES Y RENTAS PARA INCREMENTAR LOS ALCANCES DE LA FISCALIZACION  QUE REALIZA LA CONTRALORIA GENERAL DE LA REPUBLICA",
	"totalSi": 20,
	"totalNo": 40,
	"totalAbst": 30,
	"totalPc": 1,
	"totalLE": 10,
	"totalLO": 29,
	"votes": [
		{
			"id": 1,
			"pollId": 1,
			"politicianId": 21283371283,
			"value": "Si"
		},
		{
			"id": 2,
			"pollId": 1,
			"politicianId": 33333333333,
			"value": "No"
		},
		{
			"id": 3,
			"pollId": 1,
			"politicianId": 444444444444,
			"value": "Abst"
		}
	]
}
```
