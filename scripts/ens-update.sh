#!/bin/bash

CMD="ethers-ens --account $MNEMONIC --yes --wait"
DEPLOYER="ipfs-deploy -O -p pinata"
NETWORKS=("ropsten" "rinkeby" "goerli")
KEYS=("enslogin" "enslogin-default")

for module in `ls public`;
do
	ipfshash=`$DEPLOYER public/$module 2> /dev/null`

	for network in "${NETWORKS[@]}";
	do
		for key in "${KEYS[@]}";
		do
			echo -n "[$network|$module.enslogin.eth] $key → ipfs://$ipfshash ... "

			lookup=`$CMD --network $network lookup $module.enslogin.eth`
			ctrl=`grep Controller <<< $lookup | tr -s ' ' | cut -d' ' -f3`
			rslv=`grep Resolver   <<< $lookup | tr -s ' ' | cut -d' ' -f3`

			[[ -z "$ctrl" ]] && $CMD --network $network set-subnode  $module.enslogin.eth > /dev/null 2>&1
			[[ -z "$rslv" ]] && $CMD --network $network set-resolver $module.enslogin.eth > /dev/null 2>&1
			$CMD --network $network set-text $module.enslogin.eth $key ipfs://$ipfshash > /dev/null 2>&1

			echo "done"
		done
	done
done
