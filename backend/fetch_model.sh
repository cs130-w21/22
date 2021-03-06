#!/bin/sh
# wget https://filebin.net/t2alohvy9kyj6wpg/checkpoint-1480.tar.gz?t=dj21lp9b
tar -xzvf checkpoint-1480.tar.gz
rm -rf saved_models
mkdir saved_models
mv checkpoint-1480 saved_models/checkpoint-1480
