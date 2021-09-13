#!/bin/bash

mvn clean
rm -rf src/main/webapp/src.*
pushd easy-doc; yarn build; popd;
mvn package appengine:run