import {useState, useEffect} from 'react'
import {useMoralis, useMoralisWeb3Api} from 'react-moralis';

const DisplayOwnedNFTs = (props) => {
	
	const [nftImages, setNftImages] = useState([]);

	const Web3Api = useMoralisWeb3Api();

	const showMyNFTs = async () => {
    const options = { chain: props.chain ,address: props.userAddress, token_address: props.nft_contract_address};
    const myNfts = await Web3Api.account.getNFTsForContract(options);
    //console.log(myNfts);
    //console.log(myNfts.result);

    myNfts.result.forEach(nft => {
      renderImage(nft.token_uri);
    })
}

const renderImage = async (token_uri) => {
 let uriResponse = await fetch(token_uri);
 console.log(uriResponse);
 //let uriToJson = await uriResponse.json();
 // console.log(uriToJson.image);
 let image_url;
 await uriResponse.json()
 .then(result => {
  image_url = result.image;
 })
 .catch(error => {
  console.log(error)
  image_url = '#'
 })

 // let image_url = uriToJson.image.toString();

 setNftImages(prevState => {
  return [...prevState, {imageUrl: image_url}];
 });
}

useEffect(() => {
  let mounted = true;
  //console.log(props.userAddress);

  if (mounted) showMyNFTs();

  return () => mounted = false;
}, []);

	return (
		<div>
    <h3> My NFTs </h3>
     	{nftImages.map(image => (
      		<img src={image.imageUrl} style={{width:'100px'}}/>
     		))}
		</div>
		);
};

export default DisplayOwnedNFTs;