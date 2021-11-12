import logo from './logo.svg';
import './App.css';
import pinataSDK from '@pinata/sdk'
import fs from 'fs'
import diploma from './diploma_template.jpeg'

function App() {

const pinata = pinataSDK(process.env.REACT_APP_PINATA_KEY, process.env.REACT_APP_PINATA_SECRET);

// pinata.testAuthentication().then((result) => {
//     //handle successful authentication here
//     console.log(result);
// }).catch((err) => {
//     //handle error here
//     console.log(err);
// });

// const options = {
//     pinataMetadata: {
//         name: 'MyCustomName',
//         keyvalues: {
//             customKey: 'customValue',
//             customKey2: 'customValue2'
//         }
//     },
//     pinataOptions: {
//         cidVersion: 0
//     }
// };
// pinata.pinFileToIPFS(diploma, options).then((result) => {
//     //handle results here
//     console.log(result);
// }).catch((err) => {
//     //handle error here
//     console.log(err);
// });

console.log(fs);

  return (
    <div className="App">

    </div>
  );
}

export default App;
