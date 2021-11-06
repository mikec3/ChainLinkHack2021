import logo from './logo.svg';
import './App.css';
import {React, useEffect} from 'react'
import {Users, UserStorage, VaultBackupType, AddItemsResultSummary} from '@spacehq/sdk'

function App() {

  const space = async () => {

    // SpaceUser object
    const users = new Users({endpoint:'wss://auth-dev.space.storage' });
    console.log(users)

    // create a new user key-pair
    const identity = await users.createIdentity();
    console.log(identity);
  
    // Authenticate a user
    const user = await users.authenticate(identity);
    console.log(user);

    // users.list() shows all previously authenticated users in this session
    console.log(users.list());


    // backup user
    // backupKeysByPassphrase has a vault error !!!!!!!!!!!!!!!!
    //const uuid = 'special-user-id-1';
    //const passphrase = 'special-passphrase-for-user-id-1';
    //const backupType = VaultBackupType.Google;
    //await users.backupKeysByPassphrase(uuid, passphrase, backupType, user.identity);

    //const recoveredUser = await users.recoverKeysByPassphrase(uuid, passphrase, backupType);
    //console.log(recoveredUser);

    const spaceStorage = new UserStorage(user);
    console.log(spaceStorage);

    const stor = await spaceStorage.createFolder({bucket: 'personal', path: 'topFolder'});
    const result = await spaceStorage.listDirectory({path: ''});
    console.log(result);



  }

  useEffect(() => {
    space();
  }, [])

  return (
    <div className="App">

    </div>
  );
}

export default App;
