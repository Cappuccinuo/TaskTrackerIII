#!/bin/bash

export PORT=5105

cd ~/www/tasktracker3
./bin/tasktracker3 stop || true
./bin/tasktracker3 start
