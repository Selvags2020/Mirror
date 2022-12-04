const BigchainDB = require('bigchaindb-driver')
const API_PATH = 'https://test.ipdb.io/api/v1/'
const conn = new BigchainDB.Connection(API_PATH)
const bip39 = require('bip39') 
const seed =bip39.mnemonicToSeedSync('username', 'password').slice(0,32)
const alice =  new BigchainDB.Ed25519Keypair(seed)  
const painting = {
    name: 'Meninas',
    author: 'Diego Rodríguez de Silva y Velázquez',
    place: 'Madrid',
    year: '1656'
}

const painting1 = {
    name: 'Meninas',
    author: 'author',
    place: 'london',
    year: '1945'
}

const painting3 = {
    name: 'selva',
    author: 'ganesh',
    place: 'chennai',
    year: '2000'
}

const painting4 = {
    name: 'Nancy',
    author: 'Britto',
    place: 'newyork',
    year: '2002'
}

const painting5 = {
    name: 'kumar',
    author: 'ramesh',
    place: 'delhi',
    year: '2012'
}

const painting6 = {
    name: 'kumar6',
    author: 'ramesh6',
    place: 'delhi6',
    year: '20126'
}


function createAsset(Input) {
    const txCreatePaint = BigchainDB.Transaction.makeCreateTransaction(
        {
            Input,            
        },
        
        {
            datetime: new Date().toString(),
          
        },
       
        [BigchainDB.Transaction.makeOutput(
            BigchainDB.Transaction.makeEd25519Condition(alice.publicKey))],
        alice.publicKey
    )
   
    const txSigned = BigchainDB.Transaction.signTransaction(txCreatePaint,
        alice.privateKey)

    conn.postTransactionCommit(txSigned).then(res => {
            console.log('Transaction created')
            console.log(txSigned.id)
        })
}

 createAsset(painting);
// createPaint(painting1);
// createPaint(painting3);
//  createPaint(painting4);
//   createPaint(painting5);
 
         conn.searchAssets('2012').then(function(result) {(result).forEach(element => {console.log(element)});
           
             })
       
 

       