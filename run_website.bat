@echo off
title Rishi ^& Manisha - Royal Rajasthani Invitation
cd /d "%~dp0rajasthani"
echo ======================================================
echo  Starting Royal Rajasthani Wedding Invitation...
echo  Open: http://localhost:3001
echo ======================================================
start http://localhost:3001
node serve.js
pause
