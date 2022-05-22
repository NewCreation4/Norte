#!/bin/bash

function norte(){
  if [[ $1 == "run" ]]; then
    if [[ $2 == "" ]]; then
      echo "No directory given."
    elif [[ $3 == "" ]]; then
      echo "No file given."
    else
      directory=$2
      file=$3
      node $directory/lang.js $file $4 $5 $6
    fi
  elif [[ $1 == "setup" ]]; then
    sudo apt install ruby -y
    sudo apt install nodejs -y
  elif [[ $1 == "version" ]]; then
    echo "Version 0.0.0 ALPHA"
  else
    if [[ $1 == "" ]]; then
      echo "No command given."
    fi
  fi
}





