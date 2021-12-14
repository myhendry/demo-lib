import Web3 from "web3";

export const loadContract = async (name: string, web3: Web3) => {
  const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID!;

  /*
    ! SyntaxError: Unexpected token . in JSON at position 1
    Delete build or public folder and do truffle compile and truffle migrate --reset again
    Make sure the path is correct to the JSON file
  */
  const res = await fetch(`/contracts/${name}.json`);

  const Artifact = await res.json();
  // console.log("Artifact", Artifact);

  let contract = null;

  try {
    contract = new web3.eth.Contract(
      Artifact.abi,
      Artifact.networks[NETWORK_ID].address
    );
  } catch (error) {
    console.log(`Contract ${name} cannot be loaded`);
  }

  return contract;
};
