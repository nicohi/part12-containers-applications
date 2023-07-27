#!/usr/bin/env sh

# sets prompt for cleaner output from script
# call like this:
# SHELL=./mybash.sh script

bash --init-file <(echo "export PS1='> '")
