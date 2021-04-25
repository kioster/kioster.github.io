@echo off
set build_path=D:/projects/support/apache-tomcat/webapps/kiosterIO

rm -r %build_path%/*

cp -r ./dataset %build_path%
cp -r ./js %build_path%
cp -r ./css %build_path%
cp -r ./fonts %build_path%
cp -r ./templates %build_path%
cp -r ./index.html %build_path%
cp -r ./favicon.png %build_path%