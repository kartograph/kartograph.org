#!/bin/bash
clear
# show splash
cat /tmp/splash.txt

echo
echo
echo "Generando con las siguientes opciones: $@"
# get all parameters and use them in the kartograph call
kartograph $@ &

#capture pid of kartograph
pid=$!

# If this script is killed, kill the `cp'.
trap "kill $pid 2> /dev/null" EXIT

# Simulate progress bar
while kill -0 $pid 2> /dev/null; do
	sleep 0.4
	echo -ne "."
done;

# Disable the trap on a normal exit.
trap - EXIT
