Can be find by: http://138.197.24.148:8080

# Virtex backend
## Routes

### /api/suggestions
- **Method:** POST
- **Success response:** *SEE THE MODEL*
- **Error response:** *SEE THE MODEL*
```
{ 
  "customer": {
    "name": [String],
    "email": [String]
  },
  "message": [String]
}
```
### /api/customers/:id/subscribe
- **Method:** POST
- **Header:** ```{ X-Auth-Token: [token-content] }```
- **Success response:** *SEE THE MODEL*
- **Error response:** *SEE THE MODEL*
```
{ 
  "fcmToken": [String]
}
```

### /api/customers/:id/unsubscribe
- **Method:** POST
- **Header:** ```{ X-Auth-Token: [token-content] }```
- **Success response:** *SEE THE MODEL*
- **Error response:** *SEE THE MODEL*
```
{ 
  "fcmToken": [String]
}
```

### /api/notifications/last

- **Method:** GET
- **Header:** ```{ X-Auth-Token: [token-content] }```
- **Success response:** *SEE THE MODEL*
- **Error response:** *SEE THE MODEL*

## Models
### Success
#### /api/suggestions
```
{
  "message": "Mensagem de testes",
  "id": "5931f22a9cb77d4414ea504f"
}
```

#### /api/customers/:id/subscribe
```
{
  "fcmToken": "382k7t85kd9a8g72jk3j809sd8s8f23"
}

```

#### /api/customers/:id/unsubscribe
```
{
  "canceledToken": "382k7t85kd9a8g72jk3j809sd8s8f23"
}

```

#### /api/notifications/last
```
Empty
{}

Filled
{
  "createdAt": "2017-06-02T22:32:27.436Z",
  "title": "Teste",
  "message": "Mensagem de testes",
  "resolved": false,
  "target": [
    "5931cf19e50589ccadebb821"
  ],
  "id": "5931e77bcd4e1a2e9b34f9dd"
}
```

# Virtex wrapper
## Routes

### /api/auth/remote

- **Method:** POST
- **Success response:** *SEE THE MODEL*
- **Error response:** *SEE THE MODEL* 
```
{ 
  "cpfCnpj": [String],
  "password": [String]
}
```

### /api/auth/confirmLocation

- **Method:** POST
- **Header:** ```{ X-Location-Token: [confirm-token-content] }```
- **Success response:** *SEE THE MODEL*
- **Error response:** *SEE THE MODEL* 
```
{ 
  "uf": [String],
  "city": [String]
}
```

### /api/auth/confirmCustomer

- **Method:** POST
- **Header:** ```{ X-Customer-Token: [confirm-token-content] }```
- **Success response:** *SEE THE MODEL*
- **Error response:** *SEE THE MODEL* 
```
{ 
  "code": [Number | Long],
  "name": [String]
}
```

### /api/central/status

- **Method:** POST
- **Header:** ```{ X-Auth-Token: [token-content] }```
- **Success response:** *SEE THE MODEL*
- **Error response:** *SEE THE MODEL*
```
{
    "service": 2401,
    "client": 5729,
    "base": 17,
    "plan": "FIBRA EMP 5 MB - I - PICOS",
    "virtexUser": "075247@virtex.com.br",
    "expiresDay": "05",
    "limit": "ILIMITADO"
}
```

### /api/central/info

- **Method:** GET
- **Header:** ```{ X-Auth-Token: [token-content] }```
- **Success response:** *SEE THE MODEL*
- **Error response:** *SEE THE MODEL*

### /api/central/services

- **Method:** GET
- **Header:** ```{ X-Auth-Token: [token-content] }```
- **Success response:** *SEE THE MODEL*
- **Error response:** *SEE THE MODEL*

### /api/central/payments

- **Method:** GET
- **Header:** ```{ X-Auth-Token: [token-content] }```
- **Success response:** *SEE THE MODEL*
- **Error response:** *SEE THE MODEL*

### /api/images

- **Method:** GET
- **Success response:** *SEE THE MODEL*
- **Error response:** *SEE THE MODEL*

### /api/plans

- **Method:** GET
- **Success response:** *SEE THE MODEL*
- **Error response:** *SEE THE MODEL*

## Models

### Success
#### /api/auth/remote

> **It can vary according situation**
>
> 1 - When credentials have multiple locations
>
> 2 - When credentials have one location, but multiple customers *(NOTE: CAN BE APPLIED TO CONFIRMLOCATION ROUTE, WHEN SELECTED LOCATION HAVE MORE THAN ONE USER LINKED WITH THEN)*
>
> 3 - When all info is single about credentials *(NOTE: CAN BE APPLIED TO CONFIRMLOCATION ROUTE, WHEN SELECTED LOCATION HAVE ONLY ONE USER LINKED WITH THEN)*

```
SITUATION 1:

{
  "availableLocations": [
    { uf: 'PI', city: 'Floriano' },
    { uf: 'PI', city: 'Picos' },
    { uf: 'PI', city: Pio IX }
  ],
  "confirmToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTMxY2YxOWU1MDU4OWNjYWRlYmI4MjEiLCJ1c2VyIjoiMDc1MjQ3MTAwMDAxNjAiLCJwYXNzIjoiSG90ZWx0cmFuc2l0byIsImlhdCI6MTQ5NjQ0NTcyNH0.Fxl9BZN4MrIPNlJFViJwFCDkpROIF5hqK4g6UwkSBdQ"
}
```

```
SITUATION 2:

{
  "availableCustomers": [
    { code: 2931, name: 'BATALHÃO 3º' },
    { code: 2931, name: 'HOTELARIA BATALHÃO 3º' },
    { code: 2931, name: 'DEPOSITO BATALHÃO 3º' },
  ],
  "confirmToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTMxY2YxOWU1MDU4OWNjYWRlYmI4MjEiLCJ1c2VyIjoiMDc1MjQ3MTAwMDAxNjAiLCJwYXNzIjoiSG90ZWx0cmFuc2l0byIsImlhdCI6MTQ5NjQ0NTcyNH0.Fxl9BZN4MrIPNlJFViJwFCDkpROIF5hqK4g6UwkSBdQ"
}
```

```
SITUATION 3:

{
  "customer": {
    "id": "5931cf19e50589ccadebb821",
    "name": "3º BATALHAO DE ENG. DE CONSTRUCAO",
    "email": "salc@3bec.eb.mil.br"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTMxY2YxOWU1MDU4OWNjYWRlYmI4MjEiLCJ1c2VyIjoiMDc1MjQ3MTAwMDAxNjAiLCJwYXNzIjoiSG90ZWx0cmFuc2l0byIsImlhdCI6MTQ5NjQ0NTcyNH0.Fxl9BZN4MrIPNlJFViJwFCDkpROIF5hqK4g6UwkSBdQ"
}
```
#### /api/central/status
```
{
  "status": "SUCCESS",
  "usage": {
      "total": "ILIMITADO" | "40 GB",
      "consumed": {
          "value": "ILIMITADO" | "28 GB",
          "percent": 1 | 0.7
      },
      "rest": {
          "value": "ILIMITADO" | "12 GB",
          "percent": 1 | 0.3
      }
  },
  "accesses": [
    {
      "startedAt": "2017-05-06 19:17:53-03",
      "finishedAt": "2017-05-11 07:34:03-03",
      "connectionTime": 389770,
      "rate": {
        "upload": 10 MB,
        "download": 5 GB
      }
    },
    ...
  ]
}
```

#### /api/central/info
```
{
  "status": "SUCCESS",
  customers: [
    {
      "code": 5729,
      "email": "salc@3bec.eb.mil.br",
      "status": "liberado",
      "phone": "(89)3415-1695",
      "cpfCnpj": "07.524.710/0001-60",
      "cellPhone": "(89)3415-1641",
      "name": "3º BATALHAO DE ENG. DE CONSTRUCAO",
      "aliasName": "3º BATALHAO DE ENG. DE CONSTRUCAO",
      "address": {
          "uf": "PI",
          "name": "ROD BR 120/316 KM 06",
          "number": "S/N",
          "district": "UNHA DE GATO",
          "city": {
              "name": "Picos",
              "id": 1
          }
      }
    },
    ...
  ]
}
```

#### /api/central/services
```
{
  "status": "SUCCESS",
  "services": [
    {
      "service": 2401,
      "client": 5729,
      "base": 17,
      "plan": "FIBRA EMP 5 MB - I - PICOS",
      "virtexUser": "075247@virtex.com.br",
      "expiresDay": "05",
      "status": "liberado",
      "limit": "ILIMITADO" | 49572331093
    },
    ...
  ]
}
```

#### /api/central/payments
```
{
  "status": "SUCCESS",
  "payments": [
    {
      "code": 391160,
      "history": "ASSINATURA 03/2017",
      "expiresDay": "2017-03-05",
      "price": "2890.00",
      "payed": false,
      "report": "JVBERi0xLjMKMSAwIG9iago8PCAvVHlwZSAvQ2F0YWxvZwovT3V0bGluZXMgMiAwIFIKL1BhZ2VzIDMgMCBSID4+CmVuZG9iagoyIDAgb2JqCjw8IC9UeXBlIC9PdXRsaW5lcyAvQ291bnQgMCA+PgplbmRvYmoKMyAwIG9iago8PCAvVHlwZ...
    },
    ...
  ]
}
```

#### /api/images
```
{
  "status": "SUCCESS",
  "images": [
    {
      "url": "https://localhost/Arquivos/imgsCarousel/teste-slider.jpg",
      "ref": "#"
    },
    {
      "url": "https://localhost/Arquivos/imgsCarousel/teste-slider1.jpg",
      "ref": "#"
    },
    {
      "url": "https://localhost/Arquivos/imgsCarousel/teste-slider2.jpg",
      "ref": "#"
    }
  ]
}
```

#### /api/plans
```
{
  "status": "SUCCESS",
  "plans": {
    "Picos (Microrregião)": [
      {
        "genero_conexao": "Rádio Residencial",
        "plano_nome": "Plano de 1MB",
        "velocidade_nome": "1",
        "franquia_nome": "40 GB",
        "preco_plano": "69,90",
        "especial": 0
      },
      ...
    ],
    "Bom Jesus": [
      {
        "genero_conexao": "Cabo Residencial (UTP)",
        "plano_nome": "Plano de 1MB",
        "velocidade_nome": "1",
        "franquia_nome": "40 GB",
        "preco_plano": "79,90",
        "especial": 0
      },
      ...
    ],
    "Canto do Buriti": [
      {
        "genero_conexao": "Cabo (UTP)",
        "plano_nome": "Plano de 1MB",
        "velocidade_nome": "1",
        "franquia_nome": "40 GB",
        "preco_plano": "69,90",
        "especial": 0
      },
      ...
    ],
    "PIO IX": [
      {
        "genero_conexao": "Cabo Residencial (UTP)",
        "plano_nome": "Plano de 1MB",
        "velocidade_nome": "1",
        "franquia_nome": "40 GB",
        "preco_plano": "69,90",
        "especial": 0
      },
      ...
    ]
  }
}
```

## Error
#### INVALID_CREDENTIALS
```
{
    status: 'ERROR',
    internalCode: '01',
    httpCode: 401,
    message: 'Credenciais inválidas'
}
```
#### UNAUTHENTICATED
```
{
    status: 'ERROR',
    internalCode: '02',
    httpCode: 401,
    message: 'Usuário não autenticado'
}
```
#### UNAUTHORIZED
```
{
    status: 'ERROR',
    internalCode: '02',
    httpCode: 403,
    message: 'Usuário não autorizado'
}
```
#### VALIDATION
```
{
    status: 'ERROR',
    internalCode: '03',
    httpCode: 400,
    message: 'Informações pendentes ou incorretas'
}
```
#### ONLY_ONE_DEFAULT_ADMIN
```
{
    status: 'ERROR',
    internalCode: '04',
    httpCode: 400,
    message: 'Deve haver somente um administrador padrão no sistema'
}
```
#### AT_LEAST_DEFAULT_ADMIN
```
{
    status: 'ERROR',
    internalCode: '05',
    httpCode: 400,
    message: 'Deve haver pelo menos um administrador padrão no sistema'
}
```
#### ALREADY_EXISTS
```
{
    status: 'ERROR',
    internalCode: '06',
    httpCode: 406,
    message: 'Já existe um registro correspondente à estas informações'
}
```
#### CONNECTION_FAILED
```
{
    status: 'ERROR',
    internalCode: '07',
    httpCode: 500,
    message: 'Erro ao conectar ao middleware'
}
```
#### UNDEFINED
```
{
    status: 'ERROR',
    internalCode: '00',
    httpCode: 500,
    message: 'Erro inesperado. Tente novamente mais tarde ou contate o administrador'
}
```