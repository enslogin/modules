#!/bin/bash

modules=$PWD/modules_enabled

for module in `ls $modules`;
do
	echo $module
	cd $modules/$module && npm-check -u
done
