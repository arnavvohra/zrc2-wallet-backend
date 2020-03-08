# zrc2-wallet-backend


## About

This repo contains an api server for zrc2 wallet, which allows a user to store, send and receive zrc2 tokens on the Zilliqa developer testnet (https://dev-api.zilliqa.com/). Use this repo with [zrc2-wallet-frontend](https://github.com/arnavvohra/zrc2-wallet-frontend) to test the functionality of the zrc2 wallet.

## Setup

Make sure you have setup .env correctly to avoid any errors.
See .env-example for details.
The system should have mongodb installed and running.

```
git clone https://github.com/arnavvohra/zrc2-wallet-backend.git
cd zrc2-wallet-backend
npm install
npm start
```

# Rest API for ZRC2-Wallet

## General API Information

- The base endpoint is: **http://localhost:4111**
- All endpoints return a JSON object.
- All time and timestamp related fields are in **milliseconds**.

## General Information on Endpoints

- For `GET` endpoints, parameters must be sent as a `query string`.
- For `POST`, `PUT`, and `DELETE` endpoints, the parameters may be sent as a
  in the `request body`.
- Parameters may be sent in any order.

## Login endpoint

```
POST /api/v1/login
```

**Parameters:**

| Name     | Type   | Mandatory | Description                                                   |
| -------- | ------ | --------- | ------------------------------------------------------------- |
| address  | STRING | YES       | Base16 address of user obtained from keystore or zilPay login.|

**Response:**

```javascript
{
    "log": "User registered successfully",
    "flag": 143,
    "userId": "5e5d8f24f2b2d06cb7bea0a4"
}
If User already registered,
{
    "log": "Logged in successfully",
    "flag": 143,
    "userId": "5e5d8f24f2b2d06cb7bea0a4"
}
```
## Add Token endpoint

```
POST /api/v1/token/add-token
```

**Parameters:**

| Name           | Type   | Mandatory | Description                                                                                                                                                                   |
| -------------  | ------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| userAddress    | STRING | YES       | Base16 wallet address of user.                  |                                     
| contractAddress| STRING | YES       | Base16 Token contract address.                  |                                                                                                                            

**Response:**

```javascript
{
    "log": "Token added successfully",
    "flag": 143
}
```
## User's Token List Endpoint

```
GET /api/v1/token/token-list
```

**Parameters:**

| Name         | Type   | Mandatory | Description                                                   |
| ------------ | ------ | --------- | ------------------------------------------------------------- |
| userAddress  | STRING | YES       | Base16 address of user obtained from keystore or zilPay login.|                                                                                                                       

**Response:**

```javascript
{
    "log": "Tokens fetched successfully",
    "flag": 143,
    "tokensList": [
        {
            "_id": "5e5fa92d4bd6ff3258ff36ee",
            "userAddress": "0x28cAc5e9CC68D1C789203fd35Ed67b829BF85245",
            "contractAddress": "0x47d9CEea9a2DA23dc6b2D96A16F7Fbf884580665",
            "__v": 0
        }
    ]
}
```
