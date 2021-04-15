#!/bin/bash

CMD="ethers-ens --account $MNEMONIC1 --yes --wait"
# NETWORKS=("ropsten" "rinkeby" "goerli")
NETWORKS=("goerli")
# KEYS=("enslogin" "enslogin-default")
KEYS=("enslogin")
DEPLOYER="ipfs-deploy -O -p pinata"

MODULES=$@
[ -z "$MODULES" ] && MODULES=`ls modules_enabled/`

# for module in $MODULES;
for module in "walletconnect";
do
	ipfshash=`$DEPLOYER modules_enabled/$module/public/$module 2> /dev/null`

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
