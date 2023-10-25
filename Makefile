# Copyright Layer5, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

include .github/build/Makefile.show-help.mk

## Install docs.layer5.io dependencies your local machine.
## See https://gohugo.io/categories/installation
setup:
	hugo server -D 

## Run docs.layer5.io on your local machine with draft and future content enabled.
site:
	hugo server -D -F
	
## Run docs.layer5.io on your local machine. Alternate method.
site-fast:
	gatsby develop

## Build docs.layer5.io on your local machine.
build:
	hugo

## Empty build cache and run docs.layer5.io on your local machine.
clean: 
	hugo --cleanDestinationDir
	site

.PHONY: setup build site clean site-fast
