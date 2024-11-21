@echo off
start cmd /k "npx prisma migrate reset --force"
pause