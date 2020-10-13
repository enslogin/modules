#!/bin/bash

CMD="ethers-ens --account $MNEMONIC1 --yes --wait"
NETWORKS=("ropsten" "rinkeby" "goerli")
KEYS=("enslogin" "enslogin-default")

MODULES=$@
[ -z "$MODULES" ] && MODULES=`ls public`

for module in $MODULES;
do
	rsync -az public/$module hadriencroubois.com:/mnt/sata/http/shared/enslogin/.
	httppath="https://shared.hadriencroubois.com/enslogin/$module"

	for network in "${NETWORKS[@]}";
	do
		for key in "${KEYS[@]}";
		do
			echo -n "[$network|http.$module.enslogin.eth] $key → $httppath ... "

			lookup=`$CMD --network $network lookup http.$module.enslogin.eth`
			ctrl=`grep Controller <<< $lookup | tr -s ' ' | cut -d' ' -f3`
			rslv=`grep Resolver   <<< $lookup | tr -s ' ' | cut -d' ' -f3`

			[[ -z "$ctrl" ]] && $CMD --network $network set-subnode  http.$module.enslogin.eth > /dev/null 2>&1
			[[ -z "$rslv" ]] && $CMD --network $network set-resolver http.$module.enslogin.eth > /dev/null 2>&1
			$CMD --network $network set-text http.$module.enslogin.eth $key $httppath > /dev/null 2>&1

			echo "done"
		done
	done
done
